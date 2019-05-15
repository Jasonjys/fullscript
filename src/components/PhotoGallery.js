import React, { useContext } from 'react'
import styled from 'styled-components'
import { Spin, Icon, Pagination } from 'antd';

import { AppContext } from '../contextProvider/AppContext'
import Card from './Card'

const Gallery = styled.div`
  column-count: 3;
`
const IndicatorContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const PhotoGallery = () => {
  const { state, changePageSize, changePage } = useContext(AppContext)
  if (state.error) {
    return (
      <IndicatorContainer>
        Something went wrong
      </IndicatorContainer>
    )
  }

  if (state.loading) {
    return (
      <IndicatorContainer>
        <Spin indicator={antIcon} />
      </IndicatorContainer>
    )
  }

  if (!state.loading && !state.photos.length) {
    return (
      <IndicatorContainer>
        No result
      </IndicatorContainer>
    )
  }
  return (
    <React.Fragment>
      <Gallery>
        {state.photos.map(photo => <Card photo={photo} key={photo.id} />)}
      </Gallery>
      <PageContainer>
        <Pagination
          showSizeChanger
          total={state.total}
          defaultCurrent={1}
          pageSize={state.pageSize}
          pageSizeOptions={['10', '20', '30']}
          current={state.currentPage}
          onChange={(page) => {changePage(page)}}
          onShowSizeChange={(_, pageSize) => {changePageSize(pageSize)}}
        />
      </PageContainer>
    </React.Fragment>
  )
}

export default PhotoGallery