import 'jest-styled-components'
import {BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceStrict} from 'date-fns'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const profilePicImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
const emptySavedVideosImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png'
const facebookLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png'
const twitterLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png'
const linkedInLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png'

const loginRoutePath = '/login'
const savedVideosRoutePath = '/saved-videos'
const videoItemDetailRoutePath = '/videos/802fcd20-1490-43c5-9e66-ce6dfefb40d1'

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

const renderWithBrowserRouter = (
  ui = <App />,
  {route = '/saved-videos'} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
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

const trendingVideosApiUrl = 'https://apis.ccbp.in/videos/trending'

const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all'

const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'

const videoDetailsApiUrl = 'https://apis.ccbp.in/videos/:id'

const handlers = [
  rest.get(trendingVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(trendingVideosResponse)),
  ),
  rest.get(homeVideosApiUrl, (req, res, ctx) =>
    res(ctx.json(homeVideosResponse)),
  ),
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

describe(':::RJSCPYQN94_TEST_SUITE_9:::Saved Videos Route UI tests', () => {
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

  // #region UI Test Cases
  it(':::RJSCPYQN94_TEST_133:::When a Video is saved, then the Saved Videos Route should consist of at least two HTML list items and the nav items list, saved videos list should be rendered using a unique key as a prop for each nav item and video item respectively:::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)

    expect(
      screen.getAllByRole('listitem', {hidden: true}).length,
    ).toBeGreaterThanOrEqual(2)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_134:::When "/saved-videos" is provided as the URL path by an unauthenticated user, then the page should be navigated to the Login Route:::5:::', () => {
    mockGetCookie(false)
    renderWithBrowserRouter()
    expect(window.location.pathname).toBe(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_135:::When "/saved-videos" is provided as the URL path by an authenticated user, then the page should be navigated to the Saved Videos Route and should consist of an HTML image element with alt attribute value as "website logo" in Header:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(window.location.pathname).toBe(savedVideosRoutePath)
    expect(
      screen.getAllByRole('img', {name: /website logo/i})[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_136:::Saved Videos Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
    })
    expect(imageEls[0]).toBeInTheDocument()
    expect(imageEls[0].src).toBe(websiteLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_137:::Saved Videos Route should consist of an HTML image element in the Header with alt attribute value as "website logo" and src as the given logo URL, wrapped with Link from react-router-dom:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getAllByRole('link', {
        name: /website logo/,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_138:::Saved Videos Route should consist of an HTML button element with data-testid attribute value as "theme" in the Header:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const themeButtons = screen.getAllByTestId('theme')

    expect(themeButtons[0]).toBeInTheDocument()
    expect(themeButtons[0].tagName).toBe('BUTTON')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_139:::Saved Videos Route should consist of an HTML image element in the Header with alt attribute value as "profile" and src as the given profile image URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /profile/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(profilePicImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_140:::Saved Videos Route should consist of an HTML button element with text content as "Logout" in the Header:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    expect(
      screen.getByRole('button', {
        hidden: true,
        name: /Logout/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_141:::Saved Videos Route should consist of at least one HTML unordered list element to display nav items:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()
    const listItems = screen.getAllByRole('list', {hidden: true})
    expect(listItems[0].tagName).toBe('UL')
    expect(listItems.length).toBeGreaterThanOrEqual(1)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_142:::Saved Videos Route should consist of a Link from react-router-dom with text content as "Home":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Home/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_143:::Saved Videos Route should consist of a Link from react-router-dom with text content as "Trending":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Trending/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_144:::Saved Videos Route should consist of a Link from react-router-dom with text content as "Gaming":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Gaming/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_145:::Saved Videos Route should consist of a Link from react-router-dom with text content as "Saved videos":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      screen.getByRole('link', {
        hidden: true,
        name: /Saved videos/i,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_146:::Saved Videos Route should consist of an HTML paragraph element with text content as "CONTACT US" in the Sidebar:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = screen.getByText(/CONTACT US/i, {
      hidden: true,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_147:::Saved Videos Route should consist of an HTML image element with alt attribute value as "facebook logo" and src as the given Facebook logo URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /facebook logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(facebookLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_148:::Saved Videos Route should consist of an HTML image element with alt attribute value as "twitter logo" and src as the given Twitter logo URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /twitter logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(twitterLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_149:::Saved Videos Route should consist of an HTML image element with alt attribute value as "linkedin logo" and src the given LinkedIn logo URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = screen.getByRole('img', {
      hidden: true,
      name: /linkedin logo/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(linkedInLogo)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_150:::Saved Videos Route should consist of an HTML paragraph element with text content as "Enjoy! Now you can see your recommendations!" in the Sidebar:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = screen.getByText(
      /Enjoy*. Now you can see your recommendations/i,
      {
        hidden: true,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_151:::When a Video is saved, then the Saved Videos Route should consist of an HTML unordered list element to display the list of videos:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)

    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const listItems = screen.getAllByRole('list', {hidden: true})
    expect(listItems.length).toBeGreaterThanOrEqual(2)
    expect(listItems[0].tagName).toBe('UL')
    expect(listItems.every(eachItem => eachItem.tagName === 'UL')).toBeTruthy()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_152:::When a Video is saved, then the Saved Videos Route should consist of an HTML main heading element with text content as "Saved Videos" in the banner:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})
    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.getByRole('heading', {name: /Saved Videos/i}),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_153:::When a Video is saved, then the page should consist of an HTML image element with alt attribute value as "video thumbnail" and src as the value of the key "thumbnail_url" of the video item from the saved videos list:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const imageEl = screen.getByRole('img', {
      name: /video thumbnail/i,
    })

    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(videoDetailsResponse.video_details.thumbnail_url)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_154:::When a Video is saved, then the page should consist of an HTML paragraph element with text content as the value of the key "title" from the saved videos list:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const paragraphEl = screen.getByText(
      videoDetailsResponse.video_details.title,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_155:::When a Video is saved, then the page should consist of an HTML paragraph element with text content as the value of the key "name" in the channel details from the saved videos list:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const paragraphEl = screen.getByText(
      videoDetailsResponse.video_details.channel.name,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()

    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_156:::When a Video is saved, then the page should consist of an HTML paragraph element with text content as the value of the key "view_count" from the saved videos list:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const paragraphEl = screen.getByText(
      videoDetailsResponse.video_details.view_count,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_157:::When a Video is added to the saved videos list, then the page should consist of an HTML paragraph element with text content as the value of the key "published_at" from the saved videos list:::5:::', async () => {
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

    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const firstParagraphEl = screen.getByText(
      new RegExp(`${date1}|${formattedDate1}`),
    )

    expect(firstParagraphEl).toBeInTheDocument()
    expect(firstParagraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_158:::When a Video from the saved videos is clicked, then the page should be navigated to the Video Item Details Route with "/videos/:id" as the URL path:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Save/i,
      }),
    )

    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)

    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const videoLink = screen.getByRole('link', {
      name: /video thumbnail/i,
    })

    userEvent.click(videoLink)

    expect(window.location.pathname).toBe(videoItemDetailRoutePath)

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_159:::When a Video is removed from the saved videos list, then the respective video details should not be displayed in the Saved Videos Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: videoItemDetailRoutePath})

    const saveBtn = await screen.findByRole('button', {
      hidden: true,
      name: /Save/i,
    })

    userEvent.click(saveBtn)
    const savedVideosItem = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    const videoLink = screen.getByRole('link', {
      name: /video thumbnail/i,
    })

    userEvent.click(videoLink)

    expect(window.location.pathname).toBe(videoItemDetailRoutePath)

    userEvent.click(
      await screen.findByRole('button', {
        hidden: true,
        name: /Saved/i,
      }),
    )

    const savedVideosItem2 = screen.getByRole('link', {
      hidden: true,
      name: /Saved Videos/i,
    })
    userEvent.click(savedVideosItem2)
    expect(window.location.pathname).toBe(savedVideosRoutePath)

    expect(
      screen.queryByText(videoDetailsResponse.video_details.title, {
        exact: false,
      }),
    ).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_160:::When the saved videos list is empty, then the page should consist of an HTML image element with alt attribute value as "no saved videos" and src as the given no saved videos view image URL:::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const imageEl = screen.getByRole('img', {
      name: /no saved videos/i,
    })
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(emptySavedVideosImage)
    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_161:::When the saved videos list is empty, then the page should consist of an HTML main heading element with text content as "No Saved Videos Found":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    expect(
      screen.getByRole('heading', {
        name: /No Saved Videos Found/i,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPYQN94_TEST_162:::When the saved videos list is empty, then the page should consist of an HTML paragraph element with text content as "You can save your videos while watching them.":::5:::', () => {
    mockGetCookie()
    renderWithBrowserRouter()

    const paragraphEl = screen.getByText(
      /You can save your videos while watching them/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')

    restoreGetCookieFns()
  })

  // #endregion
})
