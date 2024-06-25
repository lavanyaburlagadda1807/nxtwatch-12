import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addVideoItem: () => {},
  removeVideoItem: () => {},
})

export default SavedVideosContext
