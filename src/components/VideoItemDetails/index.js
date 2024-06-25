import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceStrict} from 'date-fns'

import ThemeContext from '../../context/ThemeContext'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  getLikeButtonTextColor,
  getSaveButtonTextColor,
} from '../../utils/themeUtils'

import Header from '../Header'
import Sidebar from '../Sidebar'

import {
  VideoItemDetailsContainer,
  VideoSidebarAndVideosContainer,
  SidebarContainer,
  VideoContainer,
  VideoPlayerDetailsContainer,
  VideoPlayer,
  VideoDetailsContainer,
  VideoTitle,
  VideoButtonsViewsContainer,
  ViewsReleasedContainer,
  ViewsCount,
  DotContainer,
  ReleasedTime,
  VideoButtonsContainer,
  ButtonContainer,
  SaveButton,
  ButtonText,
  HorizontalContainer,
  HorizontalLine,
  VideoChannelContainer,
  ChannelLogo,
  ChannelDetailsContainer,
  ChannelName,
  ChannelSubscribers,
  ChannelDescription,
  ChannelDescriptionContainer,
  FailureViewContainer,
  FailureViewImg,
  FailureViewHeading,
  FailureViewDescription,
  RetryButton,
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.video_details
      const formattedData = {
        id: data.id,
        videoUrl: data.video_url,
        videoThumbnail: data.thumbnail_url,
        videoTitle: data.title,
        channelName: data.channel.name,
        channelLogo: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
        videoViewsCount: data.view_count,
        videoReleasedAt: data.published_at,
        description: data.description,
      }
      this.setState({
        videoData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = isDarkTheme => (
    <LoaderContainer isDarkTheme={isDarkTheme} data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  renderFailureView = isDarkTheme => {
    const errorImageURL = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <FailureViewContainer isDarkTheme={isDarkTheme}>
        <FailureViewImg alt="failure view" src={errorImageURL} />
        <FailureViewHeading isDarkTheme={isDarkTheme}>
          Oops! Something Went Wrong
        </FailureViewHeading>
        <FailureViewDescription isDarkTheme={isDarkTheme}>
          We are having some trouble completing your request. Please try again.
        </FailureViewDescription>
        <RetryButton type="button" onClick={this.getVideoData}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  onDislikeVideo = () => {
    const {isLiked} = this.state

    this.setState(prevState => ({isDisliked: !prevState.isDisliked}))
    if (isLiked) {
      this.setState(prevState => ({isLiked: !prevState.isLiked}))
    }
  }

  onLikeVideo = () => {
    const {isDisliked} = this.state

    this.setState(prevState => ({isLiked: !prevState.isLiked}))
    if (isDisliked) {
      this.setState(prevState => ({isDisliked: !prevState.isDisliked}))
    }
  }

  renderVideoDetailsView = isDarkTheme => (
    <SavedVideosContext.Consumer>
      {savedVideosValue => {
        const {
          savedVideosList,
          addVideoItem,
          removeVideoItem,
        } = savedVideosValue
        const {videoData, isLiked, isDisliked} = this.state
        const {
          id,
          videoUrl,
          videoTitle,
          videoViewsCount,
          videoReleasedAt,
          channelLogo,
          channelName,
          subscriberCount,
          description,
        } = videoData

        const dateFormatDistance = dateString => {
          const formatDistanceDate = formatDistanceStrict(
            new Date(dateString),
            new Date(),
          )

          return formatDistanceDate
        }

        const dateFormattedDistanceReleasedAt = dateFormatDistance(
          videoReleasedAt,
        )

        const onClickAddToSavedVideos = () => {
          const savedVideo = savedVideosList.find(
            eachVideo => eachVideo.id === id,
          )
          if (savedVideo) {
            removeVideoItem({...videoData})
          } else {
            addVideoItem({...videoData})
          }
        }

        const getVideoSavedText = () => {
          const savedVideo = savedVideosList.find(
            eachVideo => eachVideo.id === id,
          )

          if (savedVideo) {
            return 'Saved'
          }

          return 'Save'
        }

        const videoSavedText = getVideoSavedText()

        return (
          <VideoContainer
            data-testid="videoItemDetails"
            isDarkTheme={isDarkTheme}
          >
            <VideoPlayerDetailsContainer>
              <VideoPlayer>
                <ReactPlayer
                  height="100%"
                  width="100%"
                  url={videoUrl}
                  controls
                />
              </VideoPlayer>
              <VideoDetailsContainer>
                <VideoTitle isDarkTheme={isDarkTheme}>{videoTitle}</VideoTitle>
                <VideoButtonsViewsContainer>
                  <ViewsReleasedContainer>
                    <ViewsCount isDarkTheme={isDarkTheme}>
                      {videoViewsCount} views
                    </ViewsCount>
                    <DotContainer />
                    <ReleasedTime isDarkTheme={isDarkTheme}>
                      {dateFormattedDistanceReleasedAt} ago
                    </ReleasedTime>
                  </ViewsReleasedContainer>
                  <VideoButtonsContainer>
                    <ButtonContainer onClick={this.onLikeVideo}>
                      <BiLike
                        size={20}
                        color={getLikeButtonTextColor(isDarkTheme, isLiked)}
                      />
                      <ButtonText
                        color={getLikeButtonTextColor(isDarkTheme, isLiked)}
                      >
                        Like
                      </ButtonText>
                    </ButtonContainer>
                    <ButtonContainer onClick={this.onDislikeVideo}>
                      <BiDislike
                        size={20}
                        color={getLikeButtonTextColor(isDarkTheme, isDisliked)}
                      />
                      <ButtonText
                        color={getLikeButtonTextColor(isDarkTheme, isDisliked)}
                      >
                        Dislike
                      </ButtonText>
                    </ButtonContainer>
                    <SaveButton onClick={onClickAddToSavedVideos}>
                      <MdPlaylistAdd
                        size={20}
                        color={getSaveButtonTextColor(
                          isDarkTheme,
                          videoSavedText,
                        )}
                      />
                      <ButtonText
                        color={getSaveButtonTextColor(
                          isDarkTheme,
                          videoSavedText,
                        )}
                      >
                        {videoSavedText}
                      </ButtonText>
                    </SaveButton>
                  </VideoButtonsContainer>
                </VideoButtonsViewsContainer>
              </VideoDetailsContainer>
              <HorizontalContainer>
                <HorizontalLine isDarkTheme={isDarkTheme} />
              </HorizontalContainer>
              <VideoChannelContainer>
                <ChannelLogo src={channelLogo} alt="channel logo" />
                <ChannelDetailsContainer>
                  <ChannelName isDarkTheme={isDarkTheme}>
                    {channelName}
                  </ChannelName>
                  <ChannelSubscribers isDarkTheme={isDarkTheme}>
                    {subscriberCount} subscribers
                  </ChannelSubscribers>
                </ChannelDetailsContainer>
              </VideoChannelContainer>
              <ChannelDescriptionContainer>
                <ChannelDescription isDarkTheme={isDarkTheme}>
                  {description}
                </ChannelDescription>
              </ChannelDescriptionContainer>
            </VideoPlayerDetailsContainer>
          </VideoContainer>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  renderVideoItemDetails = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {apiStatus} = this.state

        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderVideoDetailsView(isDarkTheme)
          case apiStatusConstants.failure:
            return this.renderFailureView(isDarkTheme)
          case apiStatusConstants.inProgress:
            return this.renderLoadingView(isDarkTheme)
          default:
            return null
        }
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const {searchInputValue} = this.state

    return (
      <VideoItemDetailsContainer>
        <Header searchInputValue={searchInputValue} />
        <VideoSidebarAndVideosContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          {this.renderVideoItemDetails()}
        </VideoSidebarAndVideosContainer>
      </VideoItemDetailsContainer>
    )
  }
}

export default VideoItemDetails
