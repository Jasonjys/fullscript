
import React from 'react'
import styled from 'styled-components'

const Photo = styled.img`
  height: 100%;
  width: 100%;
`

const PhotoImage = ({ url, handleOnLoad }) => (
  <Photo src={url} onLoad={() => {handleOnLoad(false)}} />
)

export default PhotoImage;