import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'

import {
  TrendingContainer,
  SidebarAndVideosContainer,
  SidebarContainer,
  BannerAndVideosContainer,
  BannerContainer,
  BannerIconContainer,
  BannerText,
  VideosList,
  LoaderContainer,
  FailureViewContainer,
  FailureViewImg,
  FailureViewHeading,
  FailureViewDescription,
  RetryButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingVideosData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(trendingVideosApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.videos.map(eachItem => ({
        id: eachItem.id,
        videoTitle: eachItem.title,
        videoThumbnail: eachItem.thumbnail_url,
        channelName: eachItem.channel.name,
        channelLogo: eachItem.channel.profile_image_url,
        videoViewsCount: eachItem.view_count,
        videoReleasedAt: eachItem.published_at,
      }))
      this.setState({
        trendingVideosData: formattedData,
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
        <RetryButton type="button" onClick={this.getTrendingVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderVideosListView = () => {
    const {trendingVideosData} = this.state

    return (
      <VideosList>
        {trendingVideosData.map(eachVideo => (
          <VideoItem videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </VideosList>
    )
  }

  renderBanner = isDarkTheme => (
    <BannerContainer isDarkTheme={isDarkTheme}>
      <BannerIconContainer isDarkTheme={isDarkTheme}>
        <HiFire size={30} color="#ff0000" />
      </BannerIconContainer>
      <BannerText isDarkTheme={isDarkTheme}>Trending</BannerText>
    </BannerContainer>
  )

  renderTrendingVideosListView = isDarkTheme => (
    <BannerAndVideosContainer data-testid="trending" isDarkTheme={isDarkTheme}>
      {this.renderBanner(isDarkTheme)}
      {this.renderVideosListView()}
    </BannerAndVideosContainer>
  )

  renderTrendingVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {apiStatus} = this.state

        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderTrendingVideosListView(isDarkTheme)
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
    return (
      <TrendingContainer>
        <Header />
        <SidebarAndVideosContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          {this.renderTrendingVideos()}
        </SidebarAndVideosContainer>
      </TrendingContainer>
    )
  }
}

export default Trending
