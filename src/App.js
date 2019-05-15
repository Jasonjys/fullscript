import React, { Component } from 'react'
import styled from 'styled-components'

import AppContextProvider from './contextProvider/AppContextProvider'
import PhotoGallery from './components/PhotoGallery'
import SearchControll from './components/SearchControll'
import './App.css'

const Container = styled.div`
  padding: 15px;
`

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <Container>
          <SearchControll />
          <PhotoGallery />
        </Container>
      </AppContextProvider>
    );
  }
}

export default App;
