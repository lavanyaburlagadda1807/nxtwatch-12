import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-height: 100vh;
  background-color: '#f9f9f9';
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    padding-top: 60px;
  }
`

export const NotFoundImg = styled.img`
  width: 328px;
  @media screen and (min-width: 768px) {
    width: 475px;
  }
`

export const PageNotFoundHeading = styled.h1`
  color: '#1e293b';
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  margin: 0px;
  margin-top: 32px;
  @media screen and (min-width: 768px) {
    font-weight: 500;
    font-size: 36px;
    line-height: 1.22;
  }
`

export const PageNotFoundDescription = styled.p`
  color: '#475569';
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 1.75;
  margin-top: 16px;
  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 12px;
    line-height: 1.33;
    width: 241px;
    margin-top: 6px;
  }
`
