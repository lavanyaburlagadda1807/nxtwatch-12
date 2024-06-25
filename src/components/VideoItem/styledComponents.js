import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const VideoListItem = styled.li`
  flex-shrink: 1;
  width: 100%;
  margin: 0px;
  margin-bottom: 18px;
  padding-bottom: 0px;
  list-style-type: none;
  @media screen and (min-width: 576px) {
    margin-right: 16px;
    padding-bottom: 60px;
  }
`

export const VideoLink = styled(Link)`
  display: flex;
  text-decoration: none;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`

export const VideoThumbnail = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  max-height: 200px;
  @media screen and (min-width: 576px) {
    min-height: 100px;
    min-width: 150px;
    max-height: 197px;
    max-width: 351px;
  }
  @media screen and (min-width: 768px) {
    max-width: 250px;
  }
  @media screen and (min-width: 1023px) {
    max-width: 350px;
  }
`

export const ChannelContainer = styled.div`
  display: flex;
  @media screen and (max-width: 576px) {
    margin-top: 12px;
    padding-left: 16px;
  }
`

export const ChannelLogo = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  @media screen and (min-width: 576px) {
    display: none;
  }
`

export const ChannelDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 576px) {
    width: 100%;
    margin-left: 16px;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
  margin: 0px;
  margin-left: 10px;
  @media screen and (min-width: 576px) {
    max-width: 100%;
    margin-left: 0px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
`

export const LayoutChannelItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 10px;
  padding-left: 10px;
  @media screen and (min-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
  }
`

export const ChannelName = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (min-width: 576px) {
    font-size: 14px;
    margin-top: 4px;
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
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
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
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
