import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {BrowserRouter, Router} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

const loginRoutePath = '/login'
const homeRoutePath = '/'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
}

const passwordIncorrect = {
  error_msg: "Username and Password didn't match",
}

const invalidUser = {
  error_msg: 'Username is not found',
}
const invalidInputs = {
  error_msg: 'Username or password is invalid',
}

const videosResponse = {
  total: 2,
  videos: [
    {
      channel: {
        name: 'Namasthe Javascript',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLThy0OwLxXhdxojcnN1jV02JCv8Ffnbe3Y7BA6T=s68-c-k-c0x00ffffff-no-rj',
      },
      id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
      published_at: 'Oct 7, 2019',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'React Redux Tutorials - 14 - React Redux Setup100',
      view_count: '182K',
    },
    {
      channel: {
        name: 'Codevolution',
        profile_image_url:
          'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      },
      id: '4f757b30-06be-4776-b466-4181d6646729',
      published_at: 'Aug 21, 2021',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const apiUrl = 'https://apis.ccbp.in/login'
const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all'

const handlers = [
  rest.post(apiUrl, (req, res, ctx) => {
    const {username, password} = JSON.parse(req.body)

    if (
      username === '' ||
      password === '' ||
      username === undefined ||
      password === undefined
    )
      return res(ctx.status(400, 'invalid request'), ctx.json(invalidInputs))
    else if (username === 'rahul' && password === 'rahul@2021')
      return res(ctx.json(loginSuccessResponse))
    else if (username === 'rahul' && password !== 'rahul@2021')
      return res(
        ctx.status(401, 'invalid request'),
        ctx.json(passwordIncorrect),
      )
    else return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
  }),
  rest.get(homeVideosApiUrl, (req, res, ctx) => res(ctx.json(videosResponse))),
]

const server = setupServer(...handlers)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
}

const mockGetCookie = () => {
  const mockedGetCookie = jest.fn(() => ({
    jwt_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
  }))
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const rtlRender = (ui = <App />, path = '/login') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  const {container} = render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
    container,
  }
}

const renderWithBrowserRouter = (ui = <App />, {route = '/login'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const originalFetch = window.fetch

describe(':::RJSCPYQN94_TEST_SUITE_7:::Nxt Watch Authentication tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPYQN94_TEST_105:::Login Route should consist of an HTML form element:::5:::', () => {
    const {container} = renderWithBrowserRouter()
    const formEl = container.querySelector('form')
    expect(formEl).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_106:::Login Route should consist of an HTML image element with alt attribute value as "website logo" and src as the given logo URL:::5:::', () => {
    renderWithBrowserRouter()
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
  })

  it(':::RJSCPYQN94_TEST_107:::Login Route should consist of an HTML input element with label text as "USERNAME" and type attribute value as "text":::5:::', () => {
    renderWithBrowserRouter()
    const inputEl = screen.getByLabelText(/USERNAME/i)
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('text')
  })

  it(':::RJSCPYQN94_TEST_108:::Login Route should consist of an HTML input element with label text as "PASSWORD" and type attribute value as "password":::5:::', () => {
    renderWithBrowserRouter()
    const inputEl = screen.getByLabelText(/^PASSWORD/i)
    expect(inputEl).toBeInTheDocument()
    expect(inputEl.type).toBe('password')
  })

  it(':::RJSCPYQN94_TEST_109:::Login Route should consist of an HTML input element with label text as "Show Password" and type attribute value as "checkbox":::5:::', () => {
    renderWithBrowserRouter()
    const checkBox = screen.getByLabelText(/Show Password/i)
    expect(checkBox.type).toBe('checkbox')
  })

  it(':::RJSCPYQN94_TEST_110:::Login Route should consist of an HTML button element with text content as "Login" and type attribute value as "submit":::5:::', () => {
    renderWithBrowserRouter()
    const buttonEl = screen.getByRole('button', {name: /Login/i})
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it(':::RJSCPYQN94_TEST_111:::Login Route should consist of an HTML button element with text content as "Login" and the color as "#ffffff":::5:::', () => {
    renderWithBrowserRouter()

    expect(
      screen.getByRole('button', {
        name: /Login/i,
      }),
    ).toHaveStyle('color: #ffffff')
  })

  it(':::RJSCPYQN94_TEST_112:::When "/login" is provided as the URL path by an unauthenticated user, then the page should be navigated to Login Route and consist of an  HTML button element with text content as "Login":::5:::', async () => {
    renderWithBrowserRouter()
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_113:::When "/login" is provided as the URL path by an authenticated user, then the page should be navigated to the Home Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_114:::When a non-empty value is provided in the HTML input element with the label text as "USERNAME", then the value provided should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter()
    const inputEl = screen.getByLabelText(/USERNAME/i)
    userEvent.type(inputEl, 'rahul')
    expect(inputEl).toHaveValue('rahul')
  })

  it(':::RJSCPYQN94_TEST_115:::When a non-empty value is provided in the HTML input element with the label text as "PASSWORD", then the value provided should be displayed in the HTML input element:::5:::', () => {
    renderWithBrowserRouter()
    const inputEl = screen.getByLabelText(/^PASSWORD/i)
    userEvent.type(inputEl, 'rahul@2021')
    expect(inputEl).toHaveValue('rahul@2021')
  })

  it(':::RJSCPYQN94_TEST_116:::When the checkbox input element with the label text as "Show Password" is checked, then the checkbox input element should be checked:::5:::', () => {
    renderWithBrowserRouter()
    const checkBoxEl = screen.getByLabelText(/Show Password/i)

    userEvent.click(checkBoxEl)
    expect(checkBoxEl.checked).toBeTruthy()
  })

  it(':::RJSCPYQN94_TEST_117:::When the checkbox input element with the label text as "Show Password" is checked, then the type of the PASSWORD input element should be "text":::5:::', () => {
    renderWithBrowserRouter()
    const checkBoxEl = screen.getByLabelText(/Show Password/i)

    userEvent.click(checkBoxEl)
    expect(checkBoxEl.checked).toBeTruthy()
    expect(screen.getByLabelText(/^PASSWORD/i).type).toBe('text')
  })

  it(':::RJSCPYQN94_TEST_118:::When the checkbox input element with the label text as "Show Password" is unchecked, then the type of the PASSWORD input element should be "password":::5:::', () => {
    renderWithBrowserRouter()
    const checkBoxEl = screen.getByLabelText(/Show Password/i)

    userEvent.click(checkBoxEl)

    userEvent.click(checkBoxEl)
    expect(checkBoxEl.checked).toBeFalsy()
    expect(screen.getByLabelText(/^PASSWORD/i).type).toBe('password')
  })

  it(':::RJSCPYQN94_TEST_119:::When username and password are provided and the Login button is clicked, then an HTTP GET request should be made to the given Login API URL:::5:::', async () => {
    mockSetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(loginSuccessResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()
    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(mockFetchFunction.mock.calls[0][0]).toMatch(`${apiUrl}`)

    restoreSetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_120:::When the Login is successful, then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument, and expiry days as the third argument:::5:::', async () => {
    mockSetCookie()
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_121:::When the Login is successful, then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordFields = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordFields, 'rahul@2021')
    userEvent.click(loginButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalledWith('/'))
    restoreHistoryReplace(history)
  })

  it(':::RJSCPYQN94_TEST_122:::When valid username and password are provided and the Login button is clicked, then the page should be navigated to the Home Route:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    mockGetCookie()

    await waitFor(() => expect(window.location.pathname).toBe(homeRoutePath))

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_123:::When username and password are empty, and the Login button is clicked, then the page should consist of an HTML paragraph element with text content as the error message received from the response, and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(
      /Username or password is invalid/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPYQN94_TEST_124:::When a valid username is provided and the Login button is clicked with an empty password, then the page should consist of an HTML paragraph element with text content as the error message received from the response:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(
      /Username or password is invalid/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPYQN94_TEST_125:::When a valid username is provided and the Login button is clicked with an empty password, then the page should consist of an HTML paragraph element with text content as the error message received from the response, and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(loginButton)
    const paragraphEl = await screen.findByText(
      /Username or password is invalid/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPYQN94_TEST_126:::When a non-empty password is provided and the Login button is clicked with an empty username, then the page should consist of an HTML paragraph element with text content as the error message received from the response:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, 'rahul1')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username or password is invalid/i),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_127:::When a non-empty password is provided and the Login button is clicked with an empty username, then the page should consist of an HTML paragraph element with text content as the error message received from the response, and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, 'rahul1')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username or password is invalid/i),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPYQN94_TEST_128:::When invalid username and password are provided and the Login button is clicked, then the page should consist of an HTML paragraph element with text content as the error message received from the response, and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username is not found/i),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(loginRoutePath)
  })

  it(':::RJSCPYQN94_TEST_129:::When a valid username and invalid password are provided and the Login button is clicked, then the page should consist of an HTML paragraph element with text content as the error message received from the response, and the page should not be navigated:::5:::', async () => {
    renderWithBrowserRouter()

    const usernameField = screen.getByLabelText(/USERNAME/i)
    const passwordField = screen.getByLabelText(/^PASSWORD/i)
    const loginButton = screen.getByRole('button', {
      name: /Login/i,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'wrongPassword')
    userEvent.click(loginButton)
    expect(
      await screen.findByText(/Username and Password didn't match/i),
    ).toBeInTheDocument()

    expect(window.location.pathname).toBe(loginRoutePath)
  })
})
