import molesReducer, { initialState } from "./moles"
import {
  UPDATE_ACTIVE_MOLES,
  UPDATE_WACKED_MOLE,
  CLEAR_ACTIVE_MOLES,
} from "../constants"


describe("molesReducer", () => {
  it("initializes state with an array of 16 objects", () => {
    expect(molesReducer(undefined, {})).toHaveLength(16)
    expect(molesReducer(undefined, {})).toEqual(initialState)
  })

  it("sets an active state on 4 unique moles", () => {
    const action = {
      type: UPDATE_ACTIVE_MOLES,
      payload: {
        moles: initialState,
        uptime: 5,
      },
    }

    const activeMoles = molesReducer(undefined, action).filter(
      mole => mole.active
    )
    expect(activeMoles).toHaveLength(4)
  })

  it("finds wacked moles and set their active state to false", () => {
    expect.assertions(2)
    const oneActiveMole = new Array(16).fill(undefined).map((mole, index) => {
      return {
        index,
        active: index === 4 ? true : false,
        hidingTime: 55,
      }
    })

    expect(oneActiveMole.filter(mole => mole.active)).toHaveLength(1)

    const action = {
      type: UPDATE_WACKED_MOLE,
      payload: 4,
    }

    const activeMoles = molesReducer(oneActiveMole, action).filter(
      mole => mole.active
    )

    expect(activeMoles).toHaveLength(0)
  })

  it("clears out any active moles that the user didnt wack", () => {
    expect.assertions(2)
    const activeMoles = new Array(16).fill(undefined).map((mole, index) => {
      return {
        index,
        active: index % 8 === 0 ? true : false,
        hidingTime: 55,
      }
    })

    expect(activeMoles.filter(mole => mole.active)).toHaveLength(2)

    const action = {
      type: CLEAR_ACTIVE_MOLES,
    }

    const noActiveMoles = molesReducer(activeMoles, action).filter(
      mole => mole.active
    )

    expect(noActiveMoles).toHaveLength(0)
  })
})
