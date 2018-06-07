import {
  placeMolesInField,
  updateWackedMole,
  clearMolesInField,
} from "./moles"
import {
  UPDATE_ACTIVE_MOLES,
  UPDATE_WACKED_MOLE,
  CLEAR_ACTIVE_MOLES,
} from "../constants"

it("creates an action to generate moles in the field", () => {
  const payload = new Array(16).fill(undefined).map((mole, index) => {
    return {
      index,
      active: index % 4 === 0,
    }
  })

  const expectedAction = {
    type: UPDATE_ACTIVE_MOLES,
    payload,
  }

  expect(placeMolesInField(payload)).toEqual(expectedAction)
})

it("create an action to update a mole that has been wacked", () => {
  const payload = 1
  const expectedAction = {
    type: UPDATE_WACKED_MOLE,
    payload,
  }

  expect(updateWackedMole(payload)).toEqual(expectedAction)
})

it("creates an action to clear out any active moles", () => {
  const expectedAction = {
    type: CLEAR_ACTIVE_MOLES,
  }

  expect(clearMolesInField()).toEqual(expectedAction)
})
