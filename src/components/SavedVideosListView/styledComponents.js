import styled from 'styled-components'

export const VideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  overflow-y: auto;
`

export const BannerContainer = styled.div`
  display: flex;
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
  @media screen and (min-width: 768px) {
    width: 80px;
    height: 80px;
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
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  margin: 0px;
  margin-top: 24px;
  padding: 0px;
  list-style-type: none;
  @media screen and (min-width: 576px) {
    margin-top: 16px;
    padding-top: 8px;
    padding-left: 24px;
  }
  @media screen and (min-width: 768px) {
    padding-top: 32px;
    padding-left: 56px;
    padding-right: 32px;
  }
`
