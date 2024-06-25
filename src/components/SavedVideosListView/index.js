import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'
import SavedVideosContext from '../../context/SavedVideosContext'

import VideoItem from '../VideoItem'

import {
  VideosContainer,
  BannerContainer,
  BannerIconContainer,
  BannerText,
  VideosList,
} from './styledComponents'

const SavedVideosListView = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      return (
        <SavedVideosContext.Consumer>
          {savedVideosValues => {
            const {savedVideosList} = savedVideosValues

            return (
              <VideosContainer isDarkTheme={isDarkTheme}>
                <BannerContainer isDarkTheme={isDarkTheme}>
                  <BannerIconContainer isDarkTheme={isDarkTheme}>
                    <MdPlaylistAdd size={30} color="#ff0000" />
                  </BannerIconContainer>
                  <BannerText isDarkTheme={isDarkTheme}>
                    Saved Videos
                  </BannerText>
                </BannerContainer>
                <VideosList>
                  {savedVideosList.map(eachVideo => (
                    <VideoItem videoDetails={eachVideo} key={eachVideo.id} />
                  ))}
                </VideosList>
              </VideosContainer>
            )
          }}
        </SavedVideosContext.Consumer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideosListView
