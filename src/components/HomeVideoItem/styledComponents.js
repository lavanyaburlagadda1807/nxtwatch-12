import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const VideoLinkContainer = styled(Link)`
  flex-shrink: 1;
  width: 100%;
  min-width: 276px;
  margin: 0px;
  margin-bottom: 18px;
  padding-bottom: 0px;
  text-decoration: none;
  @media screen and (min-width: 576px) {
    width: 30%;
    margin-right: 16px;
    padding-bottom: 60px;
  }
  @media screen and (min-width: 768px) {
    width: 276px;
  }
`

export const VideoListItem = styled.li`
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 100%;
  max-width: 276px;
  @media screen and (max-width: 576px) {
    max-width: 100%;
  }
`

export const ChannelContainer = styled.div`
  display: flex;
  margin-top: 12px;
  padding-left: 16px;
  @media screen and (min-width: 576px) {
    margin-top: 8px;
    max-width: 276px;
    padding-left: 0px;
  }
`

export const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

export const ChannelDetailsContainer = styled.div`
  margin-left: 12px;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
`

export const LayoutChannelItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 10px;
  padding-left: 0px;
  @media screen and (min-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }
`

export const ChannelName = styled.p`
  color: ${props => (props.isDarkTheme ? '#64748b' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  margin-top: 0px;
  @media screen and (min-width: 576px) {
    margin-top: 4px;
    font-size: 14px;
  }
`

export const ViewsReleasedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0px;
  padding-top: 4px;
  @media screen and (max-width: 576px) {
    padding-top: 0px;
  }
`

export const ViewsCount = styled.p`
  color: ${props => (props.isDarkTheme ? '#64748b' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`

export const DotContainer = styled.div`
  text-align: center;
  align-self: center;
  background-color: #475569;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  margin-right: 8px;
  margin-left: 8px;
`

export const MobileDotContainer = styled(DotContainer)`
  @media screen and (min-width: 576px) {
    display: none;
  }
`

export const ReleasedTime = styled.p`
  color: ${props => (props.isDarkTheme ? '#64748B' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
