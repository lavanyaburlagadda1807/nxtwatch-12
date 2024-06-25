import {AiOutlineSearch} from 'react-icons/ai'

import ThemeContext from '../../context/ThemeContext'

import {
  SearchContainer,
  SearchInputField,
  SearchButton,
} from './styledComponents'

const VideosSearch = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {searchInput} = props

      const onSearch = () => {
        const {getVideos} = props

        getVideos()
      }

      const onChangeSearchInput = event => {
        const {changeSearchInput} = props

        changeSearchInput(event.target.value)
      }

      return (
        <SearchContainer>
          <SearchInputField
            value={searchInput}
            isDarkTheme={isDarkTheme}
            type="search"
            id="search"
            placeholder="Search"
            className="search-input"
            onChange={onChangeSearchInput}
          />
          <SearchButton
            data-testid="searchButton"
            onClick={onSearch}
            isDarkTheme={isDarkTheme}
            type="button"
          >
            <AiOutlineSearch color="#606060" size={15} />
          </SearchButton>
        </SearchContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default VideosSearch
