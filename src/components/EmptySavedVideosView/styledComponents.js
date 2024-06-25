import styled from 'styled-components'

export const EmptyViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  @media screen and (min-width: 768px) {
    align-items: center;
  }
`

export const EmptyViewResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-top: 60px;
  max-width: 458px;
  @media screen and (min-width: 768px) {
    width: 90%;
    max-width: 1110px;
  }
`

export const EmptyViewImg = styled.img`
  width: 311px;
  @media screen and (min-width: 768px) {
    width: 501px;
  }
`

export const EmptyVideosText = styled.h1`
  text-align: center;
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 600;
  line-height: 1.7;
  margin-top: 55px;
`
export const EmptyDescription = styled.p`
  text-align: center;
  color: ${props => (props.isDarkTheme ? '#f1f5f9' : '#475569')};
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.7;
  margin: 0px;
`
