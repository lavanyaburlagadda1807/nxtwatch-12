import styled from 'styled-components'

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: 100vh;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
  width: 90%;
  max-width: 350px;
  border-radius: 8px;
  box-shadow: ${props => (props.isDarkTheme ? '' : '0px 8px 40px #ebebeb')};
  padding: 32px 16px 32px 16px;
  @media screen and (min-width: 768px) {
    max-width: 450px;
    padding: 48px;
  }
`

export const WebsiteLogo = styled.img`
  width: 116px;
  margin-bottom: 8px;
  @media screen and (min-width: 768px) {
    width: 185px;
    margin-bottom: 40px;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`

export const InputLabel = styled.label`
  color: ${props => (props.isDarkTheme ? '#f8fafc' : '#7e858e')};
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 0px;
`

export const InputField = styled.input`
  font-size: 14px;
  height: 40px;
  border: ${props =>
    props.isDarkTheme ? '1px solid #475569' : '1px solid #d7dfe9'};
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#cbd5e1' : '#64748b')};
  border-radius: 2px;
  margin-top: 5px;
  padding: 8px 16px 8px 16px;
  outline: none;
`

export const CheckboxInputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`

export const CheckboxInput = styled.input`
  height: 16px;
  width: 16px;
`

export const ShowPasswordLabel = styled.label`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.7;
  margin: 0px;
  margin-left: 5px;
`

export const LoginButton = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: none;
  margin-top: 24px;
  margin-bottom: 16px;
  outline: none;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    margin-top: 32px;
    margin-bottom: 0px;
  }
`

export const ErrorMessage = styled.p`
  align-self: start;
  color: #ff0b37;
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 1.33;
  margin-top: 3px;
  margin-bottom: 0px;
`
