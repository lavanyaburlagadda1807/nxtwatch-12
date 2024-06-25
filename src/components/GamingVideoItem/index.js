import ThemeContext from '../../context/ThemeContext'

import {
  VideoLink,
  VideoListItem,
  ChannelContainer,
  VideoThumbnail,
  ChannelDetailsContainer,
  VideoTitle,
  ViewsCount,
} from './styledComponents'

const GamingVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoDetails} = props
      const {id, videoThumbnail, videoTitle, videoViewsCount} = videoDetails

      return (
        <VideoListItem>
          <VideoLink to={`/videos/${id}`}>
            <ChannelContainer>
              <VideoThumbnail src={videoThumbnail} alt="video thumbnail" />
              <ChannelDetailsContainer>
                <VideoTitle isDarkTheme={isDarkTheme}>{videoTitle}</VideoTitle>
                <ViewsCount isDarkTheme={isDarkTheme}>
                  {videoViewsCount} Watching Worldwide
                </ViewsCount>
              </ChannelDetailsContainer>
            </ChannelContainer>
          </VideoLink>
        </VideoListItem>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoItem
