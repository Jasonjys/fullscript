import React, { Component } from 'react'
import styled from 'styled-components'

import AppContextProvider from './contextProvider/AppContextProvider'
import PhotoGallery from './components/PhotoGallery'
import FilterDropdown from './components/FilterDropdown'
import './App.css'

const Container = styled.div`
  padding: 15px;
`

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <Container>
          <FilterDropdown />
          <PhotoGallery />
        </Container>
      </AppContextProvider>
    );
  }
}

export default App;
