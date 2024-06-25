import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {RiCloseLine} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'

import ThemeContext from '../../context/ThemeContext'

import Sidebar from '../Sidebar'

import './index.css'

import {
  NavHeader,
  NavbarMobileContainer,
  NavbarHeaderDetailsSection,
  HamburgerIconButton,
  PopupContainer,
  CloseButton,
  PopupChannelsContainer,
  MobileLogoutButton,
  NavbarLargeContainer,
  WebsiteLogo,
  DesktopNavMenuContainer,
  ThemeButton,
  UserProfileContainer,
  ProfilePic,
  DesktopLogoutButton,
  LogoutPopupContentContainer,
  PopUpTextContent,
  LogoutConfirmationButtonsContainer,
  PopUpCancelButton,
  PopUpLogOutButton,
} from './styledComponents'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onToggleTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        const {history} = props

        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const websiteLogoImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const getIconColor = isDarkThemeProp => {
        const color = isDarkThemeProp ? '#f8fafc' : '#231f20'

        return color
      }

      return (
        <NavHeader isDarkTheme={isDarkTheme}>
          <NavbarMobileContainer>
            <Link to="/">
              <WebsiteLogo src={websiteLogoImageURL} alt="website logo" />
            </Link>
            <NavbarHeaderDetailsSection>
              <ThemeButton
                data-testid="theme"
                type="button"
                onClick={onToggleTheme}
              >
                {isDarkTheme ? (
                  <FiSun size={24} color="white" />
                ) : (
                  <FaMoon size={20} />
                )}
              </ThemeButton>

              <Popup
                className="popup-content"
                modal
                trigger={
                  <HamburgerIconButton type="button">
                    <GiHamburgerMenu
                      color={getIconColor(isDarkTheme)}
                      size={24}
                    />
                  </HamburgerIconButton>
                }
              >
                {close => (
                  <PopupContainer isDarkTheme={isDarkTheme}>
                    <CloseButton type="button" onClick={() => close()}>
                      <RiCloseLine
                        color={getIconColor(isDarkTheme)}
                        size={30}
                      />
                    </CloseButton>
                    <PopupChannelsContainer>
                      <Sidebar />
                    </PopupChannelsContainer>
                  </PopupContainer>
                )}
              </Popup>

              <Popup
                className="logout-popup"
                modal
                overlayStyle={{backgroundColor: '#00000080'}}
                trigger={
                  <MobileLogoutButton type="button">
                    <FiLogOut color={getIconColor(isDarkTheme)} size={24} />
                  </MobileLogoutButton>
                }
              >
                {close => (
                  <LogoutPopupContentContainer isDarkTheme={isDarkTheme}>
                    <PopUpTextContent isDarkTheme={isDarkTheme}>
                      Are you sure you want to logout?
                    </PopUpTextContent>
                    <LogoutConfirmationButtonsContainer>
                      <PopUpCancelButton
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </PopUpCancelButton>
                      <PopUpLogOutButton
                        type="button"
                        className="trigger-button"
                        onClick={() => {
                          close()
                          onClickLogout()
                        }}
                      >
                        Confirm
                      </PopUpLogOutButton>
                    </LogoutConfirmationButtonsContainer>
                  </LogoutPopupContentContainer>
                )}
              </Popup>
            </NavbarHeaderDetailsSection>
          </NavbarMobileContainer>

          <NavbarLargeContainer>
            <Link to="/">
              <WebsiteLogo src={websiteLogoImageURL} alt="website logo" />
            </Link>

            <DesktopNavMenuContainer>
              <ThemeButton
                data-testid="theme"
                type="button"
                onClick={onToggleTheme}
              >
                {isDarkTheme ? (
                  <FiSun size={24} color="white" />
                ) : (
                  <FaMoon size={24} />
                )}
              </ThemeButton>
              <UserProfileContainer>
                <ProfilePic
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </UserProfileContainer>
              <Popup
                className="logout-popup"
                modal
                overlayStyle={{backgroundColor: '#00000080'}}
                trigger={
                  <DesktopLogoutButton
                    isDarkTheme={isDarkTheme}
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </DesktopLogoutButton>
                }
              >
                {close => (
                  <LogoutPopupContentContainer isDarkTheme={isDarkTheme}>
                    <PopUpTextContent isDarkTheme={isDarkTheme}>
                      Are you sure you want to logout?
                    </PopUpTextContent>
                    <LogoutConfirmationButtonsContainer>
                      <PopUpCancelButton
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </PopUpCancelButton>
                      <PopUpLogOutButton
                        type="button"
                        className="trigger-button"
                        onClick={() => {
                          close()
                          onClickLogout()
                        }}
                      >
                        Confirm
                      </PopUpLogOutButton>
                    </LogoutConfirmationButtonsContainer>
                  </LogoutPopupContentContainer>
                )}
              </Popup>
            </DesktopNavMenuContainer>
          </NavbarLargeContainer>
        </NavHeader>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
