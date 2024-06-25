import ThemeContext from '../../context/ThemeContext'

import {
  EmptyViewContainer,
  EmptyViewResponsiveContainer,
  EmptyViewImg,
  EmptyVideosText,
  EmptyDescription,
} from './styledComponents'

const EmptySavedVideosView = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      return (
        <EmptyViewContainer data-testid="savedVideos" isDarkTheme={isDarkTheme}>
          <EmptyViewResponsiveContainer>
            <EmptyViewImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <EmptyVideosText isDarkTheme={isDarkTheme}>
              No Saved Videos Found
            </EmptyVideosText>
            <EmptyDescription isDarkTheme={isDarkTheme}>
              You can save your videos while watching them.
            </EmptyDescription>
          </EmptyViewResponsiveContainer>
        </EmptyViewContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default EmptySavedVideosView
