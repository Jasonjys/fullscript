import React, { Component } from 'react'
import styled from 'styled-components'

import SearchBar from './SearchBar'
import FilterDropdown from './FilterDropdown'

const SearchControllContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px;
`

class SearchControll extends Component {

  render () {
    return (
      <SearchControllContainer>
        <SearchBar />
        <FilterDropdown />
      </SearchControllContainer>
    )
  }
}

export default SearchControll