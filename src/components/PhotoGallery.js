import React, { useContext } from 'react'
import styled from 'styled-components'
import { Spin, Icon, Pagination } from 'antd';

import { AppContext } from '../contextProvider/AppContextProvider'
import Card from './Card'

const Gallery = styled.div`
  column-count: 4;
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
  const { state, getListPhotos, changePageSize } = useContext(AppContext)
  console.log(state)
  if (state.loading) {
    return (
      <IndicatorContainer>
        <Spin indicator={antIcon} />
      </IndicatorContainer>
    )
  }
  if (state.error) {
    return (
      <IndicatorContainer>
        Something went wrong
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
          total={500}
          defaultCurrent={1}
          pageSize={state.pageSize}
          pageSizeOptions={['10', '20', '30']}
          current={state.currentPage}
          onChange={(page, pageSize) => getListPhotos(page, pageSize, state.orderedBy)}
          onShowSizeChange={(current, pageSize) => {
            changePageSize(pageSize)
            getListPhotos(current, pageSize, state.orderedBy)
          }}
        />
      </PageContainer>
    </React.Fragment>
  )
}

export default PhotoGallery