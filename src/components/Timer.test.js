import React from "react"
import { shallow } from "enzyme"
import Timer from "./Timer"

describe("Timer", () => {
  const props = {
    timer: 60,
  }
  const wrapper = shallow(<Timer {...props} />)

  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
