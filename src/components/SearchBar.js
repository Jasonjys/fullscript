import React, { useContext } from 'react'

import { Input } from 'antd';
import { AppContext } from '../contextProvider/AppContextProvider'

const Search = Input.Search;

const SearchBar = () => {
  const { state, handleTermSearch, updateUserInput } = useContext(AppContext)

  return (
    <Search
      enterButton
      style={{width: "40%"}}
      placeholder="search here..."
      onChange={(e) => updateUserInput(e.target.value)}
      onSearch={value => handleTermSearch(value)}
      value={state.userInput}
    />
  )
}

export default SearchBar