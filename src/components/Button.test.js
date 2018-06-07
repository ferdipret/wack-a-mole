import React from "react"
import { shallow } from "enzyme"
import Button from "./Button"

describe("button", () => {
  const wrapper = shallow(<Button />)
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe("give some dynamic props", () => {
    it("should update the button text", () => {
      expect(wrapper.find(".main-btn").dive().text()).toEqual("START")

      wrapper.setProps({running: true})
      expect(wrapper.find(".main-btn").dive().text()).toEqual("PAUSE")

      wrapper.setProps({gameover: true})
      expect(wrapper.find(".main-btn").dive().text()).toEqual("RESTART")
    })
  })
})
