import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const profilePicImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'

const facebookLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const twitterLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const linkedInLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const loginRoutePath = '/login'
const gamingRoutePath = '/gaming'

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

describe(':::RJSCPYQN94_TEST_SUITE_1:::Gaming Route UI tests', () => {
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

  it(':::RJSCPYQN94_TEST_1:::Page should consist of at least two HTML list items, videos list received from the response and the nav items list should be rendered using a unique key as a prop for each video item and nav item respectively:::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter()
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThanOrEqual(2)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_2:::When "/gaming" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter()
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_3:::When "/gaming" is provided as the URL path by an authenticated user, then the page should be navigated to the Gaming Route and should consist of an HTML main heading element with text content as "Gaming":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(window.location.pathname).toBe(gamingRoutePath)
    expect(
      await screen.findByRole('heading', {name: /Gaming/i}),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_4:::Gaming Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEls = await screen.findAllByRole('img', {
      name: /website logo/i,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_5:::Gaming Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL, wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const websiteLogos = await screen.findAllByRole('link', {
      name: /website logo/,
    })
    expect(websiteLogos[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_6:::Gaming Route should consist of an HTML button element with data-testid attribute value as "theme" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = await screen.findAllByTestId('theme')

    expect(themeButtons[0]).toBeInTheDocument()
    expect(themeButtons[0].tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_7:::Gaming Route should consist of an HTML image element in the Header with alt attribute value as "profile" and src as the value of given profile image URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      hidden: true,
      name: /profile/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(profilePicImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_8:::Gaming Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_9:::Gaming Route should consist of a Link from react-router-dom with text content as "Home":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('link', {
        hidden: true,
        name: /Home/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_10:::Gaming Route should consist of a Link from react-router-dom with text content as "Trending":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('link', {
        hidden: true,
        name: /Trending/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_11:::Gaming Route should consist of a Link from react-router-dom with text content as "Gaming":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('link', {
        hidden: true,
        name: /Gaming/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_12:::Gaming Route should consist of a Link from react-router-dom with text content as "Saved videos":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('link', {
        hidden: true,
        name: /Saved videos/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_13:::Gaming Route should consist of an HTML paragraph element with text content as "CONTACT US" in the Sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = await screen.findByText(/CONTACT US/i, {
      hidden: true,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_14:::Gaming Route should consist of an HTML image element with alt attribute value as "facebook logo" and src as the given Facebook logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      hidden: true,
      name: /facebook logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(facebookLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_15:::Gaming Route should consist of an HTML image element with alt attribute value as "twitter logo" and src as the given Twitter logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      hidden: true,
      name: /twitter logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(twitterLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_16:::Gaming Route should consist of an HTML image element with alt attribute value as "linkedin logo" and src as the given LinkedIn logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      hidden: true,
      name: /linkedin logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(linkedInLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_17:::Gaming Route should consist of an HTML paragraph element with text content as "Enjoy! Now you can see your recommendations!" in the Sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = await screen.findByText(
      /Enjoy*. Now you can see your recommendations/i,
      {
        hidden: true,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_18:::When the Gaming Route is opened, it should initially consist of an HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_19:::When the Gaming Route is opened, an HTTP GET request should be made to the given Gaming Videos API URL:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(videosResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(gamingVideosApiUrl)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_20:::When the HTTP GET request in the Gaming Route is successful, then the page should consist of at least two HTML unordered list elements to display nav items list and videos list received from the response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    const listEls = screen.getAllByRole('list', {hidden: true})
    expect(listEls.length).toBeGreaterThanOrEqual(2)
    expect(listEls.every(eachEl => eachEl.tagName === 'UL')).toBeTruthy()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_21:::When the HTTP GET request in the Gaming Route is successful, then the page should consist of an HTML main heading element with text content as "Gaming":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('heading', {name: /Gaming/i}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_22:::When the HTTP GET request in the Gaming Route is successful, then the page should consist of HTML image elements with alt attribute value as "video thumbnail" and src equal to the values of the key "thumbnail_url" received from the videos response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEls = await screen.findAllByRole('img', {
      hidden: true,
      name: /video thumbnail/i,
    })

    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(videosResponse.videos[0].thumbnail_url)

    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(videosResponse.videos[1].thumbnail_url)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_23:::When the HTTP GET request in the Gaming Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "title" received from the videos response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const firstParagraphEl = await screen.findByText(
      videosResponse.videos[0].title,
      {
        exact: false,
      },
    )
    expect(firstParagraphEl).toBeInTheDocument()

    expect(firstParagraphEl.tagName).toBe('P')

    const secondParagraphEl = screen.getByText(videosResponse.videos[1].title, {
      exact: false,
    })

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_24:::When the HTTP GET request in the Gaming Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "view_count" received from the videos response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const firstParagraphEl = await screen.findByText(
      videosResponse.videos[0].view_count,
      {
        exact: false,
      },
    )

    const secondParagraphEl = screen.getByText(
      videosResponse.videos[1].view_count,
      {
        exact: false,
      },
    )

    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })
})
