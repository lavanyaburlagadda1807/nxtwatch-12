export const getHeaderBackgroundColor = isDarkThemeProp => {
  let backgroundColor
  if (isDarkThemeProp) {
    backgroundColor = '#212121'
  } else if (isDarkThemeProp === false) {
    backgroundColor = '#ffffff'
  }
  return backgroundColor
}

export const getHomeBackgroundColor = isDarkThemeProp => {
  let backgroundColor
  if (isDarkThemeProp) {
    backgroundColor = '#181818'
  } else if (isDarkThemeProp === false) {
    backgroundColor = '#f9f9f9'
  }
  return backgroundColor
}

export const getVideoCardTitleTextColor = isDarkThemeProp => {
  let color
  if (isDarkThemeProp) {
    color = '#f8fafc'
  } else if (isDarkThemeProp === false) {
    color = '#1e293b'
  }
  return color
}

export const getVideoCardDesktopDetailsTextColor = isDarkThemeProp => {
  let color
  if (isDarkThemeProp) {
    color = '#64748b'
  } else if (isDarkThemeProp === false) {
    color = '#475569'
  }
  return color
}

export const getVideoCardMobileDetailsTextColor = isDarkThemeProp => {
  let color
  if (isDarkThemeProp) {
    color = '#94a3b8'
  } else if (isDarkThemeProp === false) {
    color = '#64748b'
  }
  return color
}

export const getRouteBackgroundColor = isDarkThemeProp => {
  let backgroundColor
  if (isDarkThemeProp) {
    backgroundColor = '#0f0f0f'
  } else if (isDarkThemeProp === false) {
    backgroundColor = '#f9f9f9'
  }
  return backgroundColor
}

export const getBannerBackgroundColor = isDarkThemeProp => {
  let backgroundColor
  if (isDarkThemeProp) {
    backgroundColor = '#181818'
  } else if (isDarkThemeProp === false) {
    backgroundColor = '#f1f1f1'
  }
  return backgroundColor
}

export const getBannerIconBackgroundColor = isDarkThemeProp => {
  let iconColor
  if (isDarkThemeProp) {
    iconColor = '#0f0f0f'
  } else if (isDarkThemeProp === false) {
    iconColor = '#e2e8f0'
  }
  return iconColor
}

export const getBannerTextColor = isDarkThemeProp => {
  let textColor
  if (isDarkThemeProp) {
    textColor = '#f8fafc'
  } else if (isDarkThemeProp === false) {
    textColor = '#1e293b'
  }
  return textColor
}

export const getLikeButtonTextColor = (isDarkThemeProp, isLikedProp) => {
  let textColor
  if (isLikedProp) {
    textColor = '#2563eb'
  } else if (isDarkThemeProp && isLikedProp === false) {
    textColor = '#94a3b8'
  } else if (isDarkThemeProp === false && isLikedProp === false) {
    textColor = '#64748b'
  }
  return textColor
}

export const getSaveButtonTextColor = (isDarkThemeProp, saveTextProp) => {
  let textColor
  if (saveTextProp === 'Saved') {
    textColor = '#2563eb'
  } else if (isDarkThemeProp && saveTextProp === 'Save') {
    textColor = '#94a3b8'
  } else if (isDarkThemeProp === false && saveTextProp === 'Save') {
    textColor = '#64748b'
  }
  return textColor
}
