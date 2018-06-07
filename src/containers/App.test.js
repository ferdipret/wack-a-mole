import React from "react"
import { shallow } from "enzyme"
import { App } from "./App"

describe("App", () => {
  const props = {
    running: false,
    timer: 60,
    phase: 1,
    uptimeWackCount: 0,
    score: 0,
    bombCount: 4,
    gameover: false,
  }
  const wrapper = shallow(<App {...props}/>)

  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("should render a `Field` component", () => {
    expect(wrapper.find("Field").exists()).toBe(true)
  })

  it("should render a `Timer` component", () => {
    expect(wrapper.find("Timer").exists()).toBe(true)
  })
})
