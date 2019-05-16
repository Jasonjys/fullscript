
import React from 'react'
import styled from 'styled-components'

const Photo = styled.img`
  height: 100%;
  width: 100%;
`

const PhotoImage = ({ url }) => (
  <Photo src={url} />
)

export default PhotoImage;