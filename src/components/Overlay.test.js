import React from "react"
import { shallow } from "enzyme"
import Overlay from "./Overlay"

describe("Overlay", () => {
  const wrapper = shallow(<Overlay />)
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
