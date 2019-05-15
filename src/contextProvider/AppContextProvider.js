import React, { Component } from 'react'

import unsplash from '../config/unsplash'
import { orderedByOptions } from '../utils/options'
import { AppContext } from './AppContext'

class AppContextProvider extends Component {
  state = {
    currentPage: 1,
    pageSize: 20,
    orderedBy: orderedByOptions[0],
    photos: [],
    loading: true,
    error: false,
    queryTerm: "",
    userInput: "",
    total: 0
  }

  componentDidMount() {
    this.getListPhotos()
  }

  getListPhotos = async () => {
    this.setState({ loading: true })
    const { currentPage, pageSize, orderedBy } = this.state
    try {
      const res = await unsplash.photos.listPhotos(currentPage, pageSize, orderedBy)
      const photos = await res.json()

      this.setState({
        photos,
        loading: false,
        total: 100
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true
      })
      console.log(err)
    }
  }

  searchPhotosByTerm = async (keyword) => {
    this.setState({ loading: true })
    const { currentPage, pageSize } = this.state
    try {
      const res = await unsplash.search.photos(keyword, currentPage, pageSize)
      const searchResult = await res.json()
      console.log("searchResult: ", searchResult)
      this.setState({
        total: searchResult.total,
        photos: searchResult.results,
        loading: false,
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      })
      console.log(err)
    }
  }

  handleTermSearch = (value) => {
    this.setState({ queryTerm: value })
    this.searchOrGet(value, true)
  }

  searchOrGet = (queryTerm, resetpage) => {
    if (resetpage) {
      this.setState({ currentPage: 1 }, () => {
        queryTerm ? this.searchPhotosByTerm(queryTerm) : this.getListPhotos()
      })
      return
    }
    queryTerm ? this.searchPhotosByTerm(queryTerm) : this.getListPhotos()
  }

  updateUserInput = (value) => {
    this.setState({ userInput: value })
  }

  changeOrderedBy = (option) => {
    this.setState({
      orderedBy: option,
      currentPage: 1,
      userInput: "",
      queryTerm: ""
    }, () => {
      this.getListPhotos()
    })
  }

  changePageSize = (pageSize) => {
    this.setState({ pageSize }, () => {
      const { queryTerm } = this.state
      this.searchOrGet(queryTerm)
    })
  }

  changePage = (page) => {
    this.setState({ currentPage: page }, () => {
      const { queryTerm } = this.state
      this.searchOrGet(queryTerm)
    })
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        orderedByOptions,
        getListPhotos: this.getListPhotos,
        changeOrderedBy: this.changeOrderedBy,
        changePage: this.changePage,
        changePageSize: this.changePageSize,
        handleTermSearch: this.handleTermSearch,
        updateUserInput: this.updateUserInput
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;