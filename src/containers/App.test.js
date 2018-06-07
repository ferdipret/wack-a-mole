import React from "react"
import { shallow } from "enzyme"
import { App } from "./App"
import Field from "../components/Field"

jest.useFakeTimers()

describe("App", () => {
  const props = {
    running: false,
    timer: 60,
    phase: 1,
    uptimeWackCount: 0,
    score: 0,
    bombCount: 4,
    gameover: false,
    moles: [],
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

  describe("`updateTimerState, calcIntervalValue`", () => {
    beforeEach(() => {
      wrapper.setState({intervalID: undefined})
    })

    it("sets the `intervalID` in the component state", () => {
      wrapper.instance().updateTimerState(true, 60)
      // We can't predict the interval id, but we can check
      // whether it has been defined
      expect(wrapper.state().intervalID).toBeDefined()
    })

    it("doesn't run the timer, if the game isn't running", () => {
      wrapper.instance().updateTimerState(false, 60)

      expect(wrapper.state().intervalID).toBeUndefined()
    })

    it("updates the timer prop", () => {
      const updateTimer = jest.fn()
      const intervalFunc = wrapper.instance().calcIntervalValue
      // Since we've already called the updateTimerState method
      // in this suite, we don't need to call it again.
      // This is less than ideal, but the jest.clearAllTimers()
      // method won't prevent the tracking of function calls
      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(setInterval).toHaveBeenLastCalledWith(intervalFunc, 100)

      wrapper.setProps({ updateTimer, timer: 50 })

      intervalFunc()

      expect(updateTimer).toHaveBeenCalledTimes(1)
    })
  })

  describe("`checkForMoles`", () => {
    const defaultMoles = new Array(16).fill(undefined).map((mole, index) => {
      return {
        index,
        active: false,
        hidingTime: 55,
      }
    })

    const oneActiveMole = new Array(16).fill(undefined).map((mole, index) => {
      return {
        index,
        active: index === 4,
        hidingTime: 55,
      }
    })

    beforeEach(() => {
      wrapper.setProps({
        moles: defaultMoles,
      })
    })


    it("checks for active moles", () => {
      const placeMolesInField = jest.fn()
      const setScore = jest.fn()

      wrapper.setProps({
        placeMolesInField,
        setScore,
        running: true,
      })

      wrapper.instance().checkForMoles()

      expect(placeMolesInField).toHaveBeenCalledTimes(1)
    })

    it("hides moles when the `hidingTime` is now", () => {
      const setScore = jest.fn()
      const clearMolesInField = jest.fn()
      wrapper.setProps({
        moles: oneActiveMole,
        timer: 55,
        setScore,
        clearMolesInField,
      })

      wrapper.instance().checkForMoles()

      expect(clearMolesInField).toHaveBeenCalledTimes(1)
    })

    describe("when clicking on a mole", () => {
      it("checks if it was a bomb", () => {
        const moles = new Array(16).fill(undefined).map((mole, index) => {
          return {
            index,
            active: index === 4,
            hidingTime: 55,
            bomb: index === 1,
          }
        })
        const updateTimer = jest.fn()
        const setWackCount = jest.fn()
        const updateWackedMole = jest.fn()
        wrapper.setProps({
          updateTimer,
          moles,
          setWackCount,
          updateWackedMole,
        })

        wrapper.instance().handleMoleClick(1)
        wrapper.instance().handleMoleClick(4)

        expect(updateTimer).toHaveBeenCalledWith(0)
        expect(setWackCount).toHaveBeenCalledWith(1)
        expect(updateWackedMole).toHaveBeenCalledWith(4)
      })
    })
  })

  describe("`handleRunningStateToggle`", () => {
    it("updates the running state", () => {
      const updateRunningState = jest.fn()
      wrapper.setProps({
        running: false,
        updateRunningState,
      })

      wrapper.instance().handleRunningStateToggle()

      expect(updateRunningState).toHaveBeenCalledWith(true)
    })

    it("restarts the game if `gameover` is true", () => {
      const resetGame = jest.fn()
      const updateTimer = jest.fn()
      wrapper.setProps({
        gameover: true,
        resetGame,
        updateTimer,
      })

      wrapper.instance().handleRunningStateToggle()

      expect(updateTimer).toHaveBeenCalledWith(60)
      expect(resetGame).toHaveBeenCalled()
    })
  })
})

jest.clearAllTimers()
