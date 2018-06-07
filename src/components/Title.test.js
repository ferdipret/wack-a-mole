import React from 'react'
import { shallow } from 'enzyme'
import Title from './Title'

describe("Title", () => {
  const wrapper = shallow(<Title />)
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
