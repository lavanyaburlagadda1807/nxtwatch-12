import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideoItem from '../GamingVideoItem'

import {
  GamingContainer,
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

class Gaming extends Component {
  state = {
    gamingVideosData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(gamingVideosApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.videos.map(eachItem => ({
        id: eachItem.id,
        videoTitle: eachItem.title,
        videoThumbnail: eachItem.thumbnail_url,
        videoViewsCount: eachItem.view_count,
      }))
      this.setState({
        gamingVideosData: formattedData,
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
        <RetryButton type="button" onClick={this.getGamingVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderVideosListView = () => {
    const {gamingVideosData} = this.state

    return (
      <VideosList>
        {gamingVideosData.map(eachVideo => (
          <GamingVideoItem videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </VideosList>
    )
  }

  renderBanner = isDarkTheme => (
    <BannerContainer isDarkTheme={isDarkTheme}>
      <BannerIconContainer isDarkTheme={isDarkTheme}>
        <SiYoutubegaming size={30} color="#ff0000" />
      </BannerIconContainer>
      <BannerText isDarkTheme={isDarkTheme}>Gaming</BannerText>
    </BannerContainer>
  )

  renderGamingVideosListView = isDarkTheme => (
    <BannerAndVideosContainer data-testid="gaming" isDarkTheme={isDarkTheme}>
      {this.renderBanner(isDarkTheme)}
      {this.renderVideosListView()}
    </BannerAndVideosContainer>
  )

  renderGamingVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {apiStatus} = this.state
        switch (apiStatus) {
          case apiStatusConstants.success:
            return this.renderGamingVideosListView(isDarkTheme)
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
      <GamingContainer>
        <Header />
        <SidebarAndVideosContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          {this.renderGamingVideos()}
        </SidebarAndVideosContainer>
      </GamingContainer>
    )
  }
}

export default Gaming
