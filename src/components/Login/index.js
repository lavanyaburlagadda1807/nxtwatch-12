import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import {
  AppContainer,
  LoginForm,
  WebsiteLogo,
  InputContainer,
  InputLabel,
  InputField,
  CheckboxInputContainer,
  CheckboxInput,
  ShowPasswordLabel,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class Login extends Component {
  state = {
    userNameInput: '',
    passwordInput: '',
    showSubmitError: false,
    showPassword: false,
    errorMsg: '',
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderShowPasswordCheckboxField = isDarkTheme => {
    const {showPassword} = this.state

    return (
      <CheckboxInputContainer>
        <CheckboxInput
          type="checkbox"
          id="showPassword"
          onChange={this.onChangeShowPassword}
          checked={showPassword}
        />
        <ShowPasswordLabel isDarkTheme={isDarkTheme} htmlFor="showPassword">
          Show Password
        </ShowPasswordLabel>
      </CheckboxInputContainer>
    )
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderPasswordInputField = isDarkTheme => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <InputContainer>
        <InputLabel isDarkTheme={isDarkTheme} htmlFor="passwordInput">
          PASSWORD
        </InputLabel>
        <InputField
          isDarkTheme={isDarkTheme}
          type={passwordType}
          id="passwordInput"
          value={password}
          onChange={this.onChangePasswordInput}
          placeholder="Password"
        />
      </InputContainer>
    )
  }

  onChangeUsernameInput = event => {
    this.setState({userNameInput: event.target.value})
  }

  renderUsernameInputField = isDarkTheme => {
    const {username} = this.state

    return (
      <InputContainer>
        <InputLabel isDarkTheme={isDarkTheme} htmlFor="userNameInput">
          USERNAME
        </InputLabel>
        <InputField
          isDarkTheme={isDarkTheme}
          type="text"
          id="userNameInput"
          value={username}
          onChange={this.onChangeUsernameInput}
          placeholder="Username"
        />
      </InputContainer>
    )
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userNameInput, passwordInput} = this.state
    const userDetails = {username: userNameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const websiteLogoImageURL = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <AppContainer isDarkTheme={isDarkTheme}>
              <LoginForm isDarkTheme={isDarkTheme} onSubmit={this.onSubmitForm}>
                <WebsiteLogo src={websiteLogoImageURL} alt="website logo" />
                {this.renderUsernameInputField(isDarkTheme)}
                {this.renderPasswordInputField(isDarkTheme)}
                {this.renderShowPasswordCheckboxField(isDarkTheme)}
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && <ErrorMessage>*{errorMsg}</ErrorMessage>}
              </LoginForm>
            </AppContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
