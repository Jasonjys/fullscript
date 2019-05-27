import React, { Component } from 'react'

import unsplash from '../config/unsplash'
import { orderedByOptions } from '../utils/options'
import { AppContext } from './AppContext'

class AppContextProvider extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    orderedBy: orderedByOptions[0],
    photos: [],
    loading: true,
    error: false,
    queryTerm: "",
    userInput: "",
    isPhotoOpened: false,
    total: 0,
    photo: null,
    isImgLoading: true
  }

  componentDidMount() {
    this.getListPhotos()
  }

  componentDidUpdate(_, prevState) {
    const {currentPage, pageSize, orderedBy, queryTerm} = this.state
    if (currentPage !== prevState.currentPage
      || pageSize !== prevState.pageSize
      || orderedBy !== prevState.orderedBy
      || queryTerm !== prevState.queryTerm
    ) {
      if (queryTerm) {
        this.searchPhotosByTerm(queryTerm)
      } else {
        this.getListPhotos()
      }
    }
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
    this.setState({
      queryTerm: value,
      currentPage: 1
    })
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
    })
  }

  changePageSize = (pageSize) => {
    this.setState({ pageSize })
  }

  changePage = (page) => {
    this.setState({ currentPage: page })
  }

  openPhoto = (photo) => {
    this.setState({
      photo,
      isPhotoOpened: true
    })
  }

  closePhoto = () => {
    this.setState({
      isPhotoOpened: false,
      isImgLoading: true
    })
  }

  setImgLoading = (isImgLoading) => {
    this.setState({ isImgLoading })
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
        updateUserInput: this.updateUserInput,
        openPhoto: this.openPhoto,
        closePhoto: this.closePhoto,
        setImgLoading: this.setImgLoading
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;