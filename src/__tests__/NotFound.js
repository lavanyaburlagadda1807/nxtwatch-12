import {BrowserRouter} from 'react-router-dom'

import {render, screen} from '@testing-library/react'

import App from '../App'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

const notFoundRoutePath = '/random-path'

const renderWithBrowserRouter = (
  ui = <App />,
  {route = notFoundRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe(':::RJSCPYQN94_TEST_SUITE_8:::Not Found Route tests', () => {
  it(':::RJSCPYQN94_TEST_130:::When a random path is provided as the URL path, then the page should be navigated to the Not Found Route and should consist of an HTML image element with alt attribute value as "not found" and src as the given not found image URL:::5:::', () => {
    renderWithBrowserRouter()
    const imageEl = screen.getByRole('img', {name: /not found/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(notFoundPageImage)
    expect(window.location.pathname).toBe('/not-found')
  })

  it(':::RJSCPYQN94_TEST_131:::When a random path is provided as the URL path, then the page should consist of an HTML main heading element with text content as "Page Not Found":::5:::', () => {
    renderWithBrowserRouter()
    expect(
      screen.getByRole('heading', {
        name: /Page Not Found/i,
      }),
    ).toBeInTheDocument()
  })

  it(':::RJSCPYQN94_TEST_132:::When a random path is provided as the URL path, then the page should consist of an HTML paragraph element with text content as "We are sorry, the page you requested could not be found.":::5:::', () => {
    renderWithBrowserRouter()
    const paragraphEl = screen.getByText(
      /We are sorry*. the page you requested could not be found/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })
})
