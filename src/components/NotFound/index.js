import {
  NotFoundContainer,
  NotFoundImg,
  PageNotFoundHeading,
  PageNotFoundDescription,
} from './styledComponents'

const NotFound = () => (
  <NotFoundContainer>
    <NotFoundImg
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
      className="not-found-img"
    />
    <PageNotFoundHeading>Page Not Found</PageNotFoundHeading>
    <PageNotFoundDescription>
      We are sorry, the page you requested could not be found.
    </PageNotFoundDescription>
  </NotFoundContainer>
)

export default NotFound
