import styled from 'styled-components'

export const GamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const SidebarAndVideosContainer = styled.div`
  display: flex;
  min-height: 80vh;
  flex-grow: 1;
`

export const SidebarContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    width: 15%;
    min-width: 245px;
    max-width: 245px;
  }
`

export const BannerAndVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  overflow-y: auto;
`

export const BannerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f1f1f1')};
  height: 80px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  @media screen and (min-width: 768px) {
    height: 128px;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 56px;
  }
`

export const BannerIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#e2e8f0')};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 16px;
  @media screen and (min-width: 768px) {
    height: 80px;
    width: 80px;
  }
`

export const BannerText = styled.h1`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`

export const VideosList = styled.ul`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  width: 100%;
  margin: 0px;
  margin-top: 24px;
  padding: 0px;
  padding-left: 24px;
  list-style-type: none;
  @media screen and (min-width: 576px) {
    justify-content: center;
    align-items: flex-start;
    margin: 0px;
    margin-top: 16px;
    padding-top: 8px;
    padding-left: 16px;
  }
  @media screen and (min-width: 768px) {
    padding-top: 32px;
    padding-right: 8px;
    padding-left: 56px;
  }
  @media screen and (min-width: 1200px) {
    justify-content: flex-start;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  height: 100%;
`

export const FailureViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  height: 100%;
  padding-top: 60px;
  @media screen and (min-width: 768px) {
    justify-content: center;
    padding-top: 0px;
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
