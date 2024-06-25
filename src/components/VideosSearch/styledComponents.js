import styled from 'styled-components'

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 24px;
  padding-left: 24px;
  @media screen and (max-width: 576px) {
    margin-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const SearchInputField = styled.input`
  color: ${props => (props.isDarkTheme ? '#e2e8f0' : '#606060')};
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#ffffff')};
  width: 30%;
  min-width: 374px;
  height: 32px;
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  border: ${props =>
    props.isDarkTheme ? '1px solid #424242' : '1px solid #cccccc'};
  outline: none;
  @media screen and (max-width: 576px) {
    min-width: 260px;
  }
`

export const SearchButton = styled.button`
  text-align: center;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#f4f4f4')};
  width: 68px;
  height: 32px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props =>
    props.isDarkTheme ? '1px solid #424242' : '1px solid #cccccc'};
  outline: none;
  cursor: pointer;
`
