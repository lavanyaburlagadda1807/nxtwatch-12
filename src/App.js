import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import ThemeContext from './context/ThemeContext'
import SavedVideosContext from './context/SavedVideosContext'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addVideoItem = video => {
    const {savedVideosList} = this.state
    if (video) {
      const updatedSavedVideosList = [...savedVideosList, video]
      this.setState({savedVideosList: updatedSavedVideosList})
    }
  }

  removeVideoItem = video => {
    const {savedVideosList} = this.state
    const updatedSavedVideosList = savedVideosList.filter(
      eachVideoItem => eachVideoItem.id !== video.id,
    )

    this.setState({savedVideosList: updatedSavedVideosList})
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <SavedVideosContext.Provider
          value={{
            savedVideosList,
            addVideoItem: this.addVideoItem,
            removeVideoItem: this.removeVideoItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </SavedVideosContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
