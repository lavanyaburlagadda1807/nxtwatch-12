import {formatDistanceStrict} from 'date-fns'

import ThemeContext from '../../context/ThemeContext'

import {
  VideoLinkContainer,
  VideoListItem,
  VideoThumbnail,
  ChannelContainer,
  ChannelLogo,
  ChannelDetailsContainer,
  VideoTitle,
  LayoutChannelItemContainer,
  ChannelName,
  MobileDotContainer,
  ViewsReleasedContainer,
  ViewsCount,
  DotContainer,
  ReleasedTime,
} from './styledComponents'

const HomeVideoItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoDetails} = props
      const {
        id,
        videoThumbnail,
        channelLogo,
        videoTitle,
        channelName,
        videoViewsCount,
        publishedAt,
      } = videoDetails

      const dateFormatDistance = dateString => {
        const formatDistanceDate = formatDistanceStrict(
          new Date(dateString),
          new Date(),
        )

        return formatDistanceDate
      }
      const dateFormattedDistanceReleasedAt = dateFormatDistance(publishedAt)

      return (
        <VideoLinkContainer to={`/videos/${id}`}>
          <VideoListItem key={id}>
            <VideoThumbnail src={videoThumbnail} alt="video thumbnail" />
            <ChannelContainer>
              <ChannelLogo src={channelLogo} alt="channel logo" />
              <ChannelDetailsContainer>
                <VideoTitle isDarkTheme={isDarkTheme}>{videoTitle}</VideoTitle>
                <LayoutChannelItemContainer>
                  <ChannelName isDarkTheme={isDarkTheme}>
                    {channelName}
                  </ChannelName>
                  <MobileDotContainer />
                  <ViewsReleasedContainer>
                    <ViewsCount isDarkTheme={isDarkTheme}>
                      {videoViewsCount} views
                    </ViewsCount>
                    <DotContainer />
                    <ReleasedTime isDarkTheme={isDarkTheme}>
                      {dateFormattedDistanceReleasedAt} ago
                    </ReleasedTime>
                  </ViewsReleasedContainer>
                </LayoutChannelItemContainer>
              </ChannelDetailsContainer>
            </ChannelContainer>
          </VideoListItem>
        </VideoLinkContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default HomeVideoItem
