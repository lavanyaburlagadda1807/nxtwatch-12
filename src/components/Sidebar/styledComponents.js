import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  width: 100%;
`

export const NavMenuList = styled.ul`
  margin: 0px;
  padding: 0px;
  padding-top: 24px;
`

export const NavMenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${props => props.backgroundColor};
`

export const NavMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  padding-left: 25px;
  text-decoration: none;
  @media screen and (max-width: 767px) {
    justify-content: center;
    padding: 0px;
  }
`

export const ChannelIconContainer = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    justify-content: flex-end;
    width: 40%;
    margin-right: 20px;
  }
`

export const ChannelTitleContainer = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 50%;
  }
`

export const NavMenuItemText = styled.p`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: ${props => props.fontWeight};
  line-height: 1.7;
  margin-left: 25px;
  @media screen and (max-width: 767px) {
    margin: 0px;
  }
`

export const NavFooter = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    padding-bottom: 48px;
  }
`

export const ContactUsText = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#334155')};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin: 0px;
`

export const NavFooterDescription = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#334155')};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin: 0px;
`

export const SocialMediaContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

export const SocialImg = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 12px;
`
