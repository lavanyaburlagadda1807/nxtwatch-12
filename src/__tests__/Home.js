import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceStrict} from 'date-fns'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const backgroundImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png'
const profilePicImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
const notFoundView =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'

const facebookLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const twitterLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const linkedInLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const loginRoutePath = '/login'
const homeRoutePath = '/'

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

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
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

const gamingVideosResponse = {
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

const homeVideosApiUrlWithSearchParameter =
  'https://apis.ccbp.in/videos/all?search='

const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'

const videoDetailsApiUrl = 'https://apis.ccbp.in/videos/:id'

const handlers = [
  rest.get(homeVideosApiUrl, (req, res, ctx) => res(ctx.json(videosResponse))),
  rest.get(gamingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(gamingVideosResponse)),
  ),
  rest.get(videoDetailsApiUrl, (req, res, ctx) =>
    res(ctx.json(videoDetailsResponse)),
  ),
]

const server = setupServer(...handlers)

const originalConsoleError = console.error
const originalFetch = window.fetch

describe(':::RJSCPYQN94_TEST_SUITE_4:::Home Route UI tests', () => {
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

  it(':::RJSCPYQN94_TEST_45:::Page should consist of at least two HTML list items, videos list received from the response and the nav items list should be rendered using a unique key as a prop for each video item and nav item respectively:::5:::', async () => {
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

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_46:::When "/" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter()
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_47:::When "/" is provided as the URL path by an authenticated user, then the page should be navigated to the Home Route and should consist of an HTML paragraph element with text content starting with "Buy Nxt Watch Premium" in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(window.location.pathname).toBe(homeRoutePath)

    const paragraphEl = screen.getByText(/^Buy Nxt Watch Premium/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_48:::Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEls = await screen.findAllByRole('img', {
      name: /website logo/i,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_49:::Home Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL, wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const websiteLogos = await screen.findAllByRole('link', {
      name: /website logo/i,
    })
    expect(websiteLogos[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_50:::Home Route should consist of an HTML button element with data-testid attribute value as "theme" in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = await screen.findAllByTestId('theme')

    expect(themeButtons[0]).toBeInTheDocument()
    expect(themeButtons[0].tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_51:::Home Route should consist of an HTML image element in the Header with alt attribute value as "profile" and src as the given profile image URL:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_52:::Home Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_53:::Home Route should consist of a Link from react-router-dom with text content as "Home":::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_54:::Home Route should consist of a Link from react-router-dom with text content as "Trending":::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_55:::Home Route should consist of a Link from react-router-dom with text content as "Gaming":::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_56:::Home Route should consist of a Link from react-router-dom with text content as "Saved videos":::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_57:::Home Route should consist of an HTML paragraph element with text content as "CONTACT US" in the Sidebar:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = await screen.findByText(/CONTACT US/i, {
      hidden: true,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_58:::Home Route should consist of an HTML image element with alt attribute value as "facebook logo" and src as the given Facebook logo URL:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_59:::Home Route should consist of an HTML image element with alt attribute value as "twitter logo" and src as the value of the given Twitter logo URL:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_60:::Home Route should consist of an HTML image element with alt attribute value as "linkedin logo" and src as the value of the given LinkedIn logo URL:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_61:::Home Route should consist of an HTML paragraph element with text content as "Enjoy! Now you can see your recommendations!" in the Sidebar:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_62:::Home Route should consist of an HTML image element with alt attribute value as "nxt watch logo" and src as the given Nxt Watch logo URL in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      hidden: true,
      name: /nxt watch logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_63:::Home Route should consist of an HTML paragraph element with text content starting with "Buy Nxt Watch Premium" in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = await screen.findByText(/^Buy Nxt Watch Premium/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_64:::Home Route should consist of an HTML button element with text content as "GET IT NOW" in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('button', {
        hidden: true,
        name: /GET IT NOW/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_65:::Home Route should consist of an HTML button element with data-testid as "close" in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const closeButton = await screen.findByTestId('close')

    expect(closeButton).toBeInTheDocument()
    expect(closeButton.tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_66:::Home Route should consist of a styled HTML container element with data-testid as "banner" and background image URL as the URL provided for the banner background image:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(await screen.findByTestId('banner')).toHaveStyle(
      `background-image: url(${backgroundImage})`,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_67:::Home Route should consist of an HTML input element with type attribute value as "search":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const searchEl = await screen.findByRole('searchbox')

    expect(searchEl.type).toBe('search')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_68:::Home Route should consist of an HTML button element with data-testid attribute value as "searchButton":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const searchBtnEl = await screen.findByTestId('searchButton')

    expect(searchBtnEl.type).toBe('button')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_69:::When the Home Route is opened, it should initially consist of an HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_70:::When the Home Route is opened, an HTTP GET request should be made to the given Home Videos API URL:::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(videosResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()

    expect(mockFetchFunction.mock.calls[0][0]).toMatch(`${homeVideosApiUrl}`)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_71:::When the HTTP GET request in the Home Route is successful, then the page should consist of at least two HTML unordered list elements to display nav items list and videos list received from the videos response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

    const listEls = screen.getAllByRole('list', {hidden: true})
    expect(listEls.length).toBeGreaterThanOrEqual(2)
    expect(listEls.every(eachEl => eachEl.tagName === 'UL')).toBeTruthy()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_72:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "title" received from the videos response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const firstParagraphEl = await screen.findByText(
      videosResponse.videos[0].title,
      {exact: false},
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

  it(':::RJSCPYQN94_TEST_73:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML image elements with alt attribute value as "video thumbnail" and src as the values of the key "thumbnail_url" received from the videos response:::5:::', async () => {
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

  it(':::RJSCPYQN94_TEST_74:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML image elements with alt attribute value as "channel logo" and src as the values of the key "profile_image_url" in the channel details received from the videos response:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEls = await screen.findAllByRole('img', {
      hidden: true,
      name: /channel logo/i,
    })

    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(
      videosResponse.videos[0].channel.profile_image_url,
    )

    expect(imageEls[1]).toBeInTheDocument()
    expect(imageEls[1].src).toBe(
      videosResponse.videos[1].channel.profile_image_url,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_75:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "name" in the channel details received from the videos response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const firstParagraphEl = await screen.findByText(
      videosResponse.videos[0].channel.name,
      {
        exact: false,
      },
    )

    expect(firstParagraphEl).toBeInTheDocument()

    expect(firstParagraphEl.tagName).toBe('P')

    const secondParagraphEl = screen.getByText(
      videosResponse.videos[1].channel.name,
      {
        exact: false,
      },
    )

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_76:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "view_count" received the videos response:::5:::', async () => {
    mockGetCookie()

    renderWithBrowserRouter()

    const firstParagraphEl = await screen.findByText(
      videosResponse.videos[0].view_count,
      {
        exact: false,
      },
    )
    expect(firstParagraphEl).toBeInTheDocument()

    expect(firstParagraphEl.tagName).toBe('P')

    const secondParagraphEl = screen.getByText(
      videosResponse.videos[1].view_count,
      {
        exact: false,
      },
    )

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_77:::When the HTTP GET request in the Home Route is successful, then the page should consist of HTML paragraph elements with text content as the values of the key "published_at" received from the videos response:::5:::', async () => {
    mockGetCookie()

    const dateFormatDistance = dateString => {
      const formatDistanceDate = formatDistanceStrict(
        new Date(dateString),
        new Date(),
      )
      return formatDistanceDate
    }

    const date1 = 'Oct 7, 2019'

    const formattedDate1 = dateFormatDistance(date1)

    const date2 = 'Aug 21, 2021'

    const formattedDate2 = dateFormatDistance(date2)

    renderWithBrowserRouter()

    const firstParagraphEl = await screen.findByText(
      new RegExp(`${date1}|${formattedDate1}`),
    )
    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    const secondParagraphEl = screen.getByText(
      new RegExp(`${date2}|${formattedDate2}`),
    )

    expect(secondParagraphEl).toBeInTheDocument()
    expect(secondParagraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  // #region functionality Test Cases

  it(':::RJSCPYQN94_TEST_78:::When a non-empty value is provided in the HTML input element for search, then the value provided should be displayed in the HTML input element:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const inputEl = await screen.findByRole('searchbox')
    userEvent.type(inputEl, '101')
    expect(inputEl).toHaveValue('101')
  })

  it(':::RJSCPYQN94_TEST_79:::When a non-empty value is provided in the HTML input element for search and the search icon button is clicked, then an HTTP GET request should be made with the value provided in the HTML input element as the value to query parameter "search":::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve(videosResponse),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()
    const inputEl = await screen.findByRole('searchbox')

    userEvent.type(inputEl, '101')
    userEvent.click(screen.getByTestId('searchButton'))
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('search=101')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_80:::Home Route should consist of Video items wrapped with Link from react-router-dom:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const videos = await screen.findAllByRole('link', {
      name: /video thumbnail/i,
    })
    expect(videos[0]).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_81:::When a Video in the Home Route is clicked, then the page should be navigated to the Video Item Details Route with "/videos/:id" as the URL path:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const videos = await screen.findAllByRole('link', {
      name: /video thumbnail/i,
    })

    userEvent.click(videos[0])

    expect(window.location.pathname).toMatch(
      '/videos/802fcd20-1490-43c5-9e66-ce6dfefb40d1',
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_82:::When the HTTP GET request made to the given Home Videos API URL returns the videos list as empty, then the page should consist of an HTML image element with alt attribute value as "no videos" and src as the given no videos view image URL:::5:::', async () => {
    mockGetCookie()

    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({videos: []}),
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter()

    const imageEl = await screen.findByRole('img', {
      name: /no videos/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundView)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_83:::When the HTTP GET request made to the given Home Videos API URL returns the videos list as empty, then the page should consist of an HTML main heading element with text content as "No Search Results Found":::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({videos: []}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()

    expect(
      await screen.findByRole('heading', {
        name: /No Search Results Found/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_84:::When the HTTP GET request made to the given Home Videos API URL returns the videos list as empty, then the page should consist of an HTML paragraph element with text content starting with "Try different keywords":::5:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => Promise.resolve({videos: []}),
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter()

    const paragraphEl = await screen.findByText(/Try different keywords/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })
})
