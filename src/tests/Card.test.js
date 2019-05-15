import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Card, { Img } from '../components/Card'

describe('Card component', () => {
  let wrapper, photo;

  beforeEach(() => {
    photo = {
      urls: {
        regular: "https://fakeurl"
      }
    }

    wrapper = shallow(<Card photo={photo} />);
  })

  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1)
  })

  it('renders 1 image', () => {
    expect(wrapper.find(Img)).to.have.lengthOf(1)
  })
})