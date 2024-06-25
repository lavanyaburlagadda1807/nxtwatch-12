import SavedVideosContext from '../../context/SavedVideosContext'

import Header from '../Header'
import Sidebar from '../Sidebar'
import EmptySavedVideosView from '../EmptySavedVideosView'
import SavedVideosListView from '../SavedVideosListView'

import {
  SavedVideosContainer,
  SidebarAndVideosContainer,
  SidebarContainer,
} from './styledComponents'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideosList} = value
      const showEmptyView = savedVideosList.length === 0

      return (
        <SavedVideosContainer>
          <Header />
          <SidebarAndVideosContainer>
            <SidebarContainer>
              <Sidebar />
            </SidebarContainer>
            {showEmptyView ? <EmptySavedVideosView /> : <SavedVideosListView />}
          </SidebarAndVideosContainer>
        </SavedVideosContainer>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SavedVideos
