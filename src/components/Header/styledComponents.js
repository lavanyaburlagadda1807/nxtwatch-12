import styled from 'styled-components'

export const NavHeader = styled.nav`
  display: flex;
  justify-content: center;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  width: 100%;
  padding: 24px 48px;
  @media screen and (max-width: 768px) {
    align-items: center;
    border-bottom-style: none;
    padding: 16px;
  }
`

export const NavbarMobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const NavbarHeaderDetailsSection = styled.div`
  display: flex;
  align-items: center;
`

export const HamburgerIconButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
`

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: 100vh;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const CloseButton = styled.button`
  display: flex;
  align-self: flex-end;
  color: #616e7c;
  background-color: transparent;
  font-size: 14px;
  font-family: 'Bree Serif';
  border: none;
  outline: none;
  margin-top: 32px;
  margin-right: 32px;
  cursor: pointer;
`

export const PopupChannelsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const MobileLogoutButton = styled.button`
  display: flex;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const NavbarLargeContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

export const WebsiteLogo = styled.img`
  width: 103px;
  height: 23px;
  @media screen and (min-width: 768px) {
    width: 112px;
    height: 27px;
  }
`

export const DesktopNavMenuContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const UserProfileContainer = styled.div`
  display: flex;
  margin-right: 24px;
  margin-left: 24px;
`

export const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
`

export const DesktopLogoutButton = styled.button`
  display: flex;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  background-color: transparent;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  height: 30px;
  border: ${props =>
    props.isDarkTheme ? '1px solid #ffffff' : '1px solid #3b82f6'};
  border-radius: 2px;
  padding: 0px 16px;
  cursor: pointer;
  outline: none;
  line-height: 1.7;
`

export const LogoutPopupContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: 162px;
  width: 80%;
  min-width: 300px;
  max-width: 366px;
  border-radius: 8px;
  @media screen and (min-width: 768px) {
    width: 30%;
  }
`

export const PopUpTextContent = styled.p`
  text-align: center;
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#00306e')};
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.9;
  margin-top: 32px;
  margin-bottom: 32px;
`

export const LogoutConfirmationButtonsContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
`

export const PopUpCancelButton = styled.button`
  color: #94a3b8;
  background-color: transparent;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  border: 1px solid #94a3b8;
  border-radius: 2px;
  outline: none;
  margin-right: 16px;
  padding: 6px 16px;
  cursor: pointer;
`

export const PopUpLogOutButton = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  border: none;
  border-radius: 2px;
  outline: none;
  margin-left: 16px;
  padding: 6px 16px;
  cursor: pointer;
`
