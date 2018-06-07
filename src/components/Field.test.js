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

  describe("when passing some dynamic props", () => {
    it("renders dynamic text", () => {
      expect.assertions(3)

      wrapper.setProps({ timer: 60 })

      expect(wrapper.find("span").text())
        .toEqual("Click the `START` button to begin a game")

      wrapper.setProps({ timer: 0 })

      expect(wrapper.find("h2").text())
        .toEqual("GAME OVER!")

      wrapper.setProps({ timer: 30 })

      expect(wrapper.find("span").text())
        .toEqual("Game Paused")
    })
  })
})
