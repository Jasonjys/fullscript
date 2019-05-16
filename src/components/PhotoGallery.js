import React, { useContext, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Pagination, Modal } from 'antd';

import { AppContext } from '../contextProvider/AppContext'
import Card from './Card'
import Spinner from './Spinner'
import Error from './Error'
import EmptyResult from './EmtyResult'

const Photo = lazy(() => import('./Photo'))

const Gallery = styled.div`
  column-count: 3;
`

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const PhotoModal = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
  }
`

const PhotoGallery = () => {
  const {
    state,
    changePageSize,
    changePage,
    openPhoto,
    closePhoto
  } = useContext(AppContext)
  if (state.error) return <Error />
  if (state.loading) return <Spinner />
  if (!state.loading && !state.photos.length) return <EmptyResult />

  console.log(state)
  return (
    <React.Fragment>
      <Gallery>
        <PhotoModal
          centered
          width="32%"
          footer={null}
          closable={false}
          onCancel={e => closePhoto()}
          visible={state.isPhotoOpened}
        >
          {state.isPhotoOpened &&
            <Suspense fallback={<Spinner />}>
              <Photo url={state.photo.urls.full} />
            </Suspense> 
          }
        </PhotoModal>
        {state.photos.map(photo => 
          <Card
            photo={photo}
            key={photo.id}
            openPhoto={openPhoto}
          />
        )}
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