import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoCloseOutline} from 'react-icons/io5'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import Sidebar from '../Sidebar'
import HomeVideoItem from '../HomeVideoItem'
import VideosSearch from '../VideosSearch'

import {
  HomeContainer,
  SidebarAndVideosContainer,
  SidebarContainer,
  BannerAndVideosContainer,
  BannerContainer,
  BannerContent,
  LogoImg,
  BannerDescription,
  GetItNowButton,
  BannerCloseButton,
  VideosList,
  LoaderContainer,
  VideosNotFoundViewContainer,
  NotFoundViewImg,
  NotFoundViewHeading,
  NotFoundViewDescription,
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

class Home extends Component {
  state = {
    videosData: [],
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachItem => ({
        id: eachItem.id,
        videoTitle: eachItem.title,
        videoThumbnail: eachItem.thumbnail_url,
        channelName: eachItem.channel.name,
        channelLogo: eachItem.channel.profile_image_url,
        videoViewsCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  enterSearchInput = () => {
    this.getVideos()
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
        <RetryButton type="button" onClick={this.getVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderNoVideosView = isDarkTheme => (
    <VideosNotFoundViewContainer isDarkTheme={isDarkTheme}>
      <NotFoundViewImg
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <NotFoundViewHeading isDarkTheme={isDarkTheme}>
        No Search Results Found
      </NotFoundViewHeading>
      <NotFoundViewDescription isDarkTheme={isDarkTheme}>
        Try different keywords or remove the search filter.
      </NotFoundViewDescription>
    </VideosNotFoundViewContainer>
  )

  renderVideosListView = isDarkTheme => {
    const {videosData} = this.state

    return videosData.length === 0 ? (
      this.renderNoVideosView(isDarkTheme)
    ) : (
      <VideosList>
        {videosData.map(eachVideo => (
          <HomeVideoItem videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </VideosList>
    )
  }

  renderVideos = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView(isDarkTheme)
      default:
        return null
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onCloseBanner = () => {
    this.setState({
      showBanner: false,
    })
  }

  renderBanner = () => {
    const {showBanner} = this.state
    if (showBanner) {
      return (
        <BannerContainer data-testid="banner">
          <BannerContent>
            <LogoImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <BannerDescription>
              Buy Nxt Watch Premium prepaid plans with UPI
            </BannerDescription>
            <GetItNowButton>GET IT NOW</GetItNowButton>
          </BannerContent>
          <BannerCloseButton data-testid="close" onClick={this.onCloseBanner}>
            <IoCloseOutline size={20} />
          </BannerCloseButton>
        </BannerContainer>
      )
    }

    return null
  }

  renderBannerAndVideosList = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchInput} = this.state

        return (
          <BannerAndVideosContainer
            data-testid="home"
            isDarkTheme={isDarkTheme}
          >
            {this.renderBanner()}
            <VideosSearch
              getVideos={this.getVideos}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
            />
            {this.renderVideos(isDarkTheme)}
          </BannerAndVideosContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <HomeContainer>
        <Header />
        <SidebarAndVideosContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          {this.renderBannerAndVideosList()}
        </SidebarAndVideosContainer>
      </HomeContainer>
    )
  }
}

export default Home
