import React from "react"
import { shallow } from "enzyme"
import Field from "./Field"
import { initialState } from "../reducers/moles"

describe("Field", () => {
  const onMoleClick = jest.fn()
  const props = {
    moles: initialState,
    onMoleClick,
    running: false,
    timer: 0,
    score: 0,
  }
  const wrapper = shallow(<Field {...props} />)

  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
