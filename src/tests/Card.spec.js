import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Card } from '../components/Card'

describe('Card component', () => {
  let wrapper, photo;

  beforeEach(() => {
    photo = {
      urls: {
        regular: "https://images.unsplash.com/photo-1553531384-411a247ccd73?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjcxNTg5fQ"
      }
    }

    wrapper = shallow(<Card photo={photo} />);
  })

  it('renders without exploding', () => {
    expect(wrapper).to.have.lengthOf(1)
  })

  it('renders 1 image', () => {
    expect(wrapper.find('img')).to.have.lengthOf(1)
  })

})