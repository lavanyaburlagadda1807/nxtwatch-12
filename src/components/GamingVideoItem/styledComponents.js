import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const VideoListItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
  width: 20%;
  min-width: 132px;
  margin-right: 16px;
  padding-bottom: 60px;
  @media screen and (min-width: 576px) {
    min-width: 200px;
  }
  @media screen and (min-width: 1200px) {
    flex-grow: 0;
  }
`

export const VideoLink = styled(Link)`
  text-decoration: none;
`

export const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const VideoThumbnail = styled.img`
  height: 100%;
  width: 100%;
  min-height: 300px;
  max-height: 370px;
  border-radius: 8px;
  @media screen and (max-width: 576px) {
    max-width: 150px;
    min-height: 169px;
    min-width: 132px;
  }
`

export const ChannelDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 16px;
  @media screen and (max-width: 576px) {
    max-width: 150px;
    min-width: 132px;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
  margin: 0px;
`

export const ViewsCount = styled.p`
  color: ${props => (props.isDarkTheme ? '#64748b' : '#475569')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
`
