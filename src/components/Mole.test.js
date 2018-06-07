import React from "react"
import { shallow } from "enzyme"
import Mole from "./Mole"
import "jest-styled-components"

describe("Mole", () => {
  const onMoleClick = jest.fn()
  const props = {
    index: 1,
    onMoleClick,
  }

  const wrapper = shallow(<Mole {...props} />)
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe("when clicking on the `onMoleClick`", () => {
    it("should call the `onClick` function", () => {
      wrapper.simulate("click")

      expect(onMoleClick).toHaveBeenCalled()
    })
  })

  describe("when setting an `active` prop on a `Mole`", () => {
    it("should have a different `top` style property", () => {
      expect.assertions(3)

      expect(wrapper.find(".mole-image").exists()).toBe(true)
      expect(wrapper.find(".mole-image")).toHaveStyleRule("top", "80px")

      wrapper.setProps({active: true})

      expect(wrapper.find(".mole-image")).toHaveStyleRule("top", "0")
    })
  })
})
