import styled from 'styled-components'

export const SavedVideosContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const SidebarAndVideosContainer = styled.div`
  display: flex;
  min-height: 80vh;
  flex-grow: 1;
`

export const SidebarContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    width: 15%;
    min-width: 245px;
    max-width: 245px;
  }
`
