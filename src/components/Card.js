import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0 0 2px;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.30);
    border-color: rgba(0,0,0,0.09);
    cursor: pointer;
  }
`

export const Img = styled.img`
  max-width: 100%;
  height: auto;
  display: block
`

const Card = ({photo}) => {
  return (
    <CardContainer>
      <Img alt="photo" src={photo.urls.regular} />
    </CardContainer>
  );
}
  
export default Card;
