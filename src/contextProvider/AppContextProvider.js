import React, { Component } from 'react'

import unsplash from '../config/unsplash'
import { orderedByOptions } from '../utils/options'

export const AppContext = React.createContext();

class AppContextProvider extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    orderedBy: orderedByOptions[0],
    photos: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    const { currentPage, pageSize, orderedBy } = this.state
    this.getListPhotos(currentPage, pageSize, orderedBy)
  }

  getListPhotos = async (currentPage, pageSize, orderedBy) => {
    this.setState({ loading: true })
    try {
      const res = await unsplash.photos.listPhotos(currentPage, pageSize, orderedBy)
      const photos = await res.json()
      this.setState({
        photos,
        loading: false,
        currentPage
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
        currentPage
      })
      console.log(err)
    }
  }

  searchPhotos = async (keyword, page, pageSize) => {
    this.setState({ loading: true })
    try {
      const res = await unsplash.search.photos(keyword, page, pageSize)
      const photos = await res.json()
      this.setState({
        photos,
        loading: false,
        currentPage
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
        currentPage
      })
      console.log(err)
    }
  }

  changeOrderedBy = (option) => {
    this.setState({
      orderedBy: option,
      loading: true
    }, () => {
      const { pageSize, orderedBy } = this.state
      this.getListPhotos(1, pageSize, orderedBy)
    })
  }

  changePageSize = (pageSize) => {
    this.setState({ pageSize })
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        orderedByOptions,
        getListPhotos: this.getListPhotos,
        changeOrderedBy: this.changeOrderedBy,
        changePageSize: this.changePageSize
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;