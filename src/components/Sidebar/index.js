import {withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/ThemeContext'

import {
  SidebarContainer,
  NavMenuList,
  NavMenuItem,
  NavMenuLink,
  ChannelIconContainer,
  ChannelTitleContainer,
  NavMenuItemText,
  NavFooter,
  ContactUsText,
  SocialMediaContainer,
  SocialImg,
  NavFooterDescription,
} from './styledComponents'

const Sidebar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {history} = props
      const {pathname} = history.location

      const getSideNavItemTextColor = isDarkThemeProp => {
        const color = isDarkThemeProp ? '#f8fafc' : '#1e293b'

        return color
      }

      const getSideNavItemTextFontWeight = isActive => {
        const fontWeight = isActive ? 600 : 400

        return fontWeight
      }

      const getSideNavItemIconColor = (isActiveProp, isDarkThemeProp) => {
        let iconColor
        if (isActiveProp && isDarkThemeProp) {
          iconColor = '#ff0000'
        } else if (isActiveProp && isDarkThemeProp === false) {
          iconColor = '#ff0000'
        } else if (isActiveProp === false && isDarkThemeProp === false) {
          iconColor = '#606060'
        } else if (isActiveProp === false && isDarkThemeProp) {
          iconColor = '#909090'
        }

        return iconColor
      }

      const getSideNavItemBackgroundColor = (isActiveProp, isDarkThemeProp) => {
        let backgroundColor
        if (isActiveProp && isDarkThemeProp) {
          backgroundColor = '#383838'
        } else if (isActiveProp && isDarkThemeProp === false) {
          backgroundColor = '#f1f5f9'
        } else if (isActiveProp === false && isDarkThemeProp === false) {
          backgroundColor = '#ffffff'
        } else if (isActiveProp === false && isDarkThemeProp) {
          backgroundColor = '#212121'
        }

        return backgroundColor
      }

      return (
        <SidebarContainer isDarkTheme={isDarkTheme}>
          <NavMenuList>
            <NavMenuItem
              backgroundColor={getSideNavItemBackgroundColor(
                pathname === '/',
                isDarkTheme,
              )}
            >
              <NavMenuLink to="/">
                <ChannelIconContainer>
                  <AiFillHome
                    color={getSideNavItemIconColor(
                      pathname === '/',
                      isDarkTheme,
                    )}
                  />
                </ChannelIconContainer>
                <ChannelTitleContainer>
                  <NavMenuItemText
                    fontWeight={getSideNavItemTextFontWeight(pathname === '/')}
                    color={getSideNavItemTextColor(isDarkTheme)}
                  >
                    Home
                  </NavMenuItemText>
                </ChannelTitleContainer>
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem
              backgroundColor={getSideNavItemBackgroundColor(
                pathname === '/trending',
                isDarkTheme,
              )}
            >
              <NavMenuLink to="/trending">
                <ChannelIconContainer>
                  <HiFire
                    color={getSideNavItemIconColor(
                      pathname === '/trending',
                      isDarkTheme,
                    )}
                  />
                </ChannelIconContainer>
                <ChannelTitleContainer>
                  <NavMenuItemText
                    fontWeight={getSideNavItemTextFontWeight(
                      pathname === '/trending',
                    )}
                    color={getSideNavItemTextColor(isDarkTheme)}
                  >
                    Trending
                  </NavMenuItemText>
                </ChannelTitleContainer>
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem
              backgroundColor={getSideNavItemBackgroundColor(
                pathname === '/gaming',
                isDarkTheme,
              )}
            >
              <NavMenuLink to="/gaming">
                <ChannelIconContainer>
                  <SiYoutubegaming
                    color={getSideNavItemIconColor(
                      pathname === '/gaming',
                      isDarkTheme,
                    )}
                  />
                </ChannelIconContainer>
                <ChannelTitleContainer>
                  <NavMenuItemText
                    fontWeight={getSideNavItemTextFontWeight(
                      pathname === '/gaming',
                    )}
                    color={getSideNavItemTextColor(isDarkTheme)}
                  >
                    Gaming
                  </NavMenuItemText>
                </ChannelTitleContainer>
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem
              backgroundColor={getSideNavItemBackgroundColor(
                pathname === '/saved-videos',
                isDarkTheme,
              )}
            >
              <NavMenuLink to="/saved-videos">
                <ChannelIconContainer>
                  <MdPlaylistAdd
                    color={getSideNavItemIconColor(
                      pathname === '/saved-videos',
                      isDarkTheme,
                    )}
                  />
                </ChannelIconContainer>
                <ChannelTitleContainer>
                  <NavMenuItemText
                    fontWeight={getSideNavItemTextFontWeight(
                      pathname === '/saved-videos',
                    )}
                    color={getSideNavItemTextColor(isDarkTheme)}
                  >
                    Saved videos
                  </NavMenuItemText>
                </ChannelTitleContainer>
              </NavMenuLink>
            </NavMenuItem>
          </NavMenuList>
          <NavFooter>
            <ContactUsText isDarkTheme={isDarkTheme}>CONTACT US</ContactUsText>
            <SocialMediaContainer>
              <SocialImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <SocialImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <SocialImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linkedin logo"
              />
            </SocialMediaContainer>
            <NavFooterDescription isDarkTheme={isDarkTheme}>
              Enjoy! Now you can see your recommendations!
            </NavFooterDescription>
          </NavFooter>
        </SidebarContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Sidebar)
