import React from 'react'
import styled from 'styled-components'

import PhotoGallery from './PhotoGallery'
import SearchControll from './SearchControll'

const Container = styled.div`
  padding: 15px;
`

const MainView = () => (
  <Container>
    <SearchControll />
    <PhotoGallery />
  </Container>
)

export default MainView