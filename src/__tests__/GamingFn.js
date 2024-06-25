import 'jest-styled-components'
import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteDarkThemeLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const loginRoutePath = '/login'
const homeRoutePath = '/'
const trendingRoutePath = '/trending'
const savedVideosRoutePath = '/saved-videos'

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const rtlRender = (ui = <App />, path = '/gaming') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

const renderWithBrowserRouter = (ui = <App />, {route = '/gaming'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const videosResponse = {
  total: 2,
  videos: [
    {
      id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'React Redux Tutorials - 14 - React Redux Setup100',
      view_count: '182K',
    },
    {
      id: '4f757b30-06be-4776-b466-4181d6646729',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const homeVideosResponse = {
  total: 2,
  videos: [
    {
      channel: {
        name: 'RELOADER',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLThy0OwLxXhdxojcnN1jV02JCv8Ffnbe3Y7BA6T=s68-c-k-c0x00ffffff-no-rj',
      },
      id: 'a19d93d6-bdac-479e-b554-974ef9e6e66c',
      published_at: 'Jan 28, 2020',
      thumbnail_url:
        'https://i.ytimg.com/vi/cfVY9wLKltA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZc-T-P1JxjqrqxJaCD02UbGNlHA',
      title: 'Node js Concepts Revision',
      view_count: '182K',
    },
    {
      channel: {
        name: 'Codevolution',
        profile_image_url:
          'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      },
      id: '4f757b30-06be-4776-b466-4181d6646729',
      published_at: 'Aug 1, 2021',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const trendingVideosResponse = {
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
      published_at: 'Aug 1, 2021',
      thumbnail_url:
        'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
      title: 'JSX Concepts in Hooks',
      view_count: '256K',
    },
  ],
}

const videoDetailsResponse = {
  video_details: {
    channel: {
      name: 'Namasthe Javascript',
      profile_image_url:
        'https://yt3.ggpht.com/os7Yw6RimtysXXpc8NrXraci87TjXgZSUQyAezi0D3RrNL3YP5riIwi1-0al4Wz0XwzH6oBu6g=s88-c-k-c0x00ffffff-no-rj',
      subscriber_count: '12M',
    },
    description:
      '++ Twitter - https://twitter.com/CodevolutionWeb+ Facebook - https://www.facebook.com/codevolutionweb Kite Code Completetion - https://www.kite.com/get-kite/?utm_me...',
    id: '802fcd20-1490-43c5-9e66-ce6dfefb40d1',
    published_at: 'Oct 7, 2019',
    thumbnail_url:
      'https://i.ytimg.com/an_webp/tQ80uAyqVyI/mqdefault_6s.webp?du=3000&sqp=CMD7gokG&rs=AOn4CLD9MJWdZK3yZQN8pwi7S8DAWF9bQQ',
    title: 'React Redux Tutorials - 14 - React Redux Setup100',
    video_url: 'https://www.youtube.com/watch?v=0bVP5cYhMuU&t=1s',
    view_count: '182K',
  },
  similar_videos: [
    {
      channel: {
        name: 'Movieclips Trailers',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLThy0OwLxXhdxojcnN1jV02JCv8Ffnbe3Y7BA6T=s68-c-k-c0x00ffffff-no-rj',
      },
      id: '5f7aaa9b-6277-4764-ba97-fb31ee94ebf1',
      published_at: 'Aug 22, 2020',
      thumbnail_url:
        'https://i.ytimg.com/vi/7ApW3NUmUEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB50NEnK0nqzyeLPR_QaTh0KRl_FA',
      title: 'Introducing HTML Basics',
      view_count: '25K',
    },
    {
      channel: {
        name: 'NS Entertainment',
        profile_image_url:
          'https://yt3.ggpht.com/ytc/AKedOLSjGqqe9T8yErW84grs2CxlpSNMTxIz8JUSH4D7gg=s68-c-k-c0x00ffffff-no-rj',
      },
      id: '7694db06-cb59-4d19-9fa0-4edce53e1805',
      published_at: 'Sep 15, 2021',
      thumbnail_url:
        'https://i.ytimg.com/vi/7ApW3NUmUEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB50NEnK0nqzyeLPR_QaTh0KRl_FA',
      title: 'JavaScript Settings And Controls',
      view_count: '63K',
    },
  ],
}

const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all'

const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'

const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'

const videoDetailsApiUrl = 'https://apis.ccbp.in/videos/:id'

const handlers = [
  rest.get(gamingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(videosResponse)),
  ),
  rest.get(homeVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(homeVideosResponse)),
  ),
  rest.get(trendingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(trendingVideosResponse)),
  ),
  rest.get(videoDetailsApiUrl, (req, res, ctx) =>
    res(ctx.json(videoDetailsResponse)),
  ),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCPYQN94_TEST_SUITE_3:::Gaming Route Functionality tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    console.error = originalConsoleError
    window.fetch = originalFetch
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPYQN94_TEST_30:::When a Video in the Gaming Route is clicked, then the page should be navigated to the Video Item Details Route with "/videos/:id" as the URL path:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const videoLinkEls = await screen.findAllByRole('link', {
      name: /video thumbnail/i,
    })

    userEvent.click(videoLinkEls[0])

    expect(window.location.pathname).toMatch(
      '/videos/802fcd20-1490-43c5-9e66-ce6dfefb40d1',
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_31:::When the Home link in the Sidebar is clicked, then the page should be navigated to the Home Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const homeBtn = await screen.findByRole('link', {
      hidden: true,
      name: /Home/i,
    })
    userEvent.click(homeBtn)

    expect(window.location.pathname).toBe(homeRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_32:::When the Trending link in the Sidebar is clicked, then the page should be navigated to the Trending Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const trendingLink = await screen.findByRole('link', {
      hidden: true,
      name: /Trending/i,
    })
    userEvent.click(trendingLink)

    expect(window.location.pathname).toBe(trendingRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_33:::When the "Saved videos" link in the Sidebar is clicked, then the page should be navigated to Saved Videos Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const savedVideosBtn = await screen.findByRole('link', {
      hidden: true,
      name: /Saved videos/i,
    })
    userEvent.click(savedVideosBtn)
    expect(window.location.pathname).toBe(savedVideosRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_34:::When the theme icon button in the Gaming Route is clicked, then the page should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given dark theme logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = await screen.findAllByTestId('theme')

    userEvent.click(themeButtons[0])
    const websiteLogos = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(websiteLogos[0]).toBeInTheDocument()

    expect(websiteLogos[0].src).toBe(websiteDarkThemeLogo)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_35:::When the theme icon button in the Gaming Route is clicked, then the page should change to dark theme and consist of the HTML container element with data-testid attribute value as "gaming" and background color as "#0f0f0f":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = await screen.findAllByTestId('theme')

    userEvent.click(themeButtons[0])

    expect(await screen.findByTestId('gaming')).toHaveStyle(
      'background-color: #0f0f0f',
    )

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_36:::When the theme icon button in the Gaming Route is clicked, and the Home link is clicked, then the page should be navigated to the Home Route, and the theme should remain the same:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = await screen.findAllByTestId('theme')

    userEvent.click(themeButtons[0])

    const websiteLogos = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(websiteLogos[0]).toBeInTheDocument()

    expect(websiteLogos[0].src).toBe(websiteDarkThemeLogo)

    const homeLink = screen.getByRole('link', {
      hidden: true,
      name: /Home/i,
    })

    userEvent.click(homeLink)

    expect(window.location.pathname).toBe('/')

    const websiteLogosHome = await screen.findAllByRole('img', {
      name: /website logo/i,
    })
    expect(websiteLogosHome[0]).toBeInTheDocument()

    expect(websiteLogosHome[0].src).toBe(websiteDarkThemeLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_37:::When the Logout button in the Header of the Gaming Route is clicked, then the page should consist of Popup from reactjs-popup:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_38:::When the Logout button in the Header of the Gaming Route is clicked, then the page should consist of an HTML paragraph element with text content as "Are you sure you want to logout?":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    )
    const paragraphEl = screen.getByText(/Are you sure you want to logout/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_39:::When the Logout button in the Header of the Gaming Route is clicked, then the page should consist of an HTML button element with text content as "Cancel":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: /Cancel/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_40:::When the Logout button in the Header of the Gaming Route is clicked, then the page should consist of an HTML button element with text content as "Confirm":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    )
    expect(
      screen.getByRole('button', {
        name: /Confirm/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_41:::When the Logout Popup is opened and the Cancel button in the popup is clicked, then the page should not consist of Popup from reactjs-popup:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    )

    userEvent.click(
      screen.getByRole('button', {
        name: /Cancel/i,
      }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_42:::When the Logout Popup is opened and the Confirm button in the popup is clicked, then the Cookies.remove() method should be called with the argument as "jwt_token":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender()

    const logoutBtn = await screen.findByRole('button', {
      hidden: true,
      name: /Logout/i,
    })

    userEvent.click(logoutBtn)

    userEvent.click(
      screen.getByRole('button', {
        name: /Confirm/i,
      }),
    )
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_43:::When the Logout Popup is opened and the Confirm button in the popup is clicked, then the history.replace() method should be called with the argument as "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender()

    mockHistoryReplace(history)
    const logoutBtn = await screen.findByRole('button', {
      hidden: true,
      name: /Logout/i,
    })
    userEvent.click(logoutBtn)

    userEvent.click(
      screen.getByRole('button', {
        name: /Confirm/i,
      }),
    )

    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_44:::When the Logout Popup is opened and the Confirm button in the popup is clicked, then the page should be navigated to the Login Route:::5:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter()

    const logoutBtn = await screen.findByRole('button', {
      hidden: true,
      name: /Logout/i,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtn)

    userEvent.click(
      screen.getByRole('button', {
        name: /Confirm/i,
      }),
    )
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })
})
