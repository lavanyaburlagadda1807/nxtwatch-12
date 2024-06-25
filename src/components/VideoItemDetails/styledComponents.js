import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const VideoSidebarAndVideosContainer = styled.div`
  display: flex;
  min-height: 80vh;
  flex-grow: 1;
`

export const SidebarContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    height: 100%;
    width: 15%;
    min-width: 245px;
    max-width: 245px;
  }
`

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  overflow-y: auto;
`

export const VideoPlayerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 550px;
  padding-top: 32px;
  padding-right: 24px;
  padding-left: 24px;
  @media screen and (max-width: 576px) {
    min-width: 100%;
    padding: 0px;
    padding-top: 16px;
  }
`

export const VideoPlayer = styled.div`
  display: flex;
  height: 250px;
  @media screen and (min-width: 768px) {
    height: 500px;
  }
`

export const VideoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  @media screen and (max-width: 576px) {
    margin-left: 16px;
  }
`

export const VideoTitle = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (max-width: 614px) {
    width: 100%;
  }
`

export const VideoButtonsViewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media screen and (max-width: 614px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ViewsReleasedContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0px;
  padding-top: 4px;
`

export const ViewsCount = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
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

export const ReleasedTime = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`

export const VideoButtonsContainer = styled.div`
  display: flex;
  margin-top: 16px;
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
`

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  outline: none;
  @media screen and (max-width: 614px) {
    margin-left: 0px;
    margin-right: 16px;
    padding-left: 0px;
  }
`

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  width: 76px;
  margin-right: 12px;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 614px) {
    margin-left: 0px;
    margin-right: 16px;
  }
`

export const ButtonText = styled.p`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  margin: 0px;
  margin-left: 5px;
`

export const HorizontalContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  @media screen and (max-width: 576px) {
    margin-right: 16px;
    margin-left: 16px;
  }
`

export const HorizontalLine = styled.hr`
  border: ${props =>
    props.isDarkTheme ? '1px solid #475569' : '1px solid #e5e5e5'};
`

export const VideoChannelContainer = styled.div`
  display: flex;
  @media screen and (max-width: 576px) {
    margin-right: 16px;
    margin-left: 16px;
  }
`

export const ChannelLogo = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-right: 16px;
`

export const ChannelDetailsContainer = styled.div``

export const ChannelName = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
  @media screen and (max-width: 614px) {
    font-size: 12px;
    margin-top: 0px;
  }
`
export const ChannelSubscribers = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  margin: 0px;
  margin-top: 4px;
  margin-bottom: 18px;
`

export const ChannelDescription = styled.p`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.7;
  @media screen and (min-width: 576px) {
    font-size: 14px;
  }
`

export const ChannelDescriptionContainer = styled.div`
  padding-left: 16px;
  @media screen and (min-width: 576px) {
    padding-left: 65px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  flex-grow: 1;
  height: 100%;
`

export const FailureViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  height: 100%;
  @media screen and (min-width: 768px) {
    align-items: center;
  }
`

export const FailureViewImg = styled.img`
  width: 188px;
  @media screen and (min-width: 768px) {
    width: 329px;
  }
`

export const FailureViewHeading = styled.h1`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-weight: 500;
  font-size: 18px;
  font-family: 'Roboto';
  line-height: 1.5;
  margin: 0px;
  margin-top: 32px;
  @media screen and (min-width: 768px) {
    font-weight: 500;
    font-size: 24px;
    line-height: 1.2;
  }
`

export const FailureViewDescription = styled.p`
  text-align: center;
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#475569')};
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.75;
  max-width: 312px;
  margin-top: 6px;
  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 1.75;
    max-width: 431px;
    margin-top: 16px;
  }
`

export const RetryButton = styled.button`
  color: #ffffff;
  background-color: #4f46e5;
  font-weight: 600;
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.33;
  border: none;
  outline: none;
  border-radius: 4px;
  padding-top: 12px;
  padding-right: 32px;
  padding-bottom: 12px;
  padding-left: 32px;
  cursor: pointer;
`
