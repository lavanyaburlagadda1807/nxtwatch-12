import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const SidebarAndVideosContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 80vh;
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
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  overflow-y: auto;
`

export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 252px;
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 32px;
`

export const LogoImg = styled.img`
  height: 32px;
  width: 141px;
`

export const BannerDescription = styled.p`
  text-align: left;
  color: #1e293b;
  font-family: 'Roboto';
  font-size: 18px;
  line-height: 1.8;
  max-width: 350px;
  margin-top: 16px;
  margin-bottom: 30px;
`

export const GetItNowButton = styled.button`
  color: #1e293b;
  background-color: transparent;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 15px;
  border: 1px solid #1e293b;
  padding: 10px 16px;
`

export const BannerCloseButton = styled.button`
  background-color: transparent;
  height: 25px;
  border: none;
  margin-top: 22px;
  margin-right: 38px;
  outline: none;
  cursor: pointer;
`

export const VideosList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0px;
  list-style-type: none;
  @media screen and (min-width: 576px) {
    align-items: flex-start;
    margin: 0px;
    margin-top: 16px;
    padding-top: 32px;
    padding-left: 24px;
    padding-right: 8px;
  }
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
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
  margin-top: 60px;
  @media screen and (min-width: 768px) {
    justify-content: center;
    margin-top: 0px;
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
  border-radius: 4px;
  padding-top: 12px;
  padding-right: 32px;
  padding-bottom: 12px;
  padding-left: 32px;
  outline: none;
  cursor: pointer;
`

export const VideosNotFoundViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  height: 100%;
  margin-top: 60px;
  @media screen and (min-width: 768px) {
    justify-content: center;
    margin-top: 0px;
  }
`

export const NotFoundViewImg = styled.img`
  width: 188px;
  @media screen and (min-width: 768px) {
    width: 329px;
  }
`

export const NotFoundViewHeading = styled.h1`
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

export const NotFoundViewDescription = styled.p`
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
