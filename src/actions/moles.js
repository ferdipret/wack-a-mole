import {
  UPDATE_ACTIVE_MOLES,
  UPDATE_WACKED_MOLE,
  CLEAR_ACTIVE_MOLES,
} from "../constants"

export function placeMolesInField(payload) {
  return {
    type: UPDATE_ACTIVE_MOLES,
    payload,
  }
}

export function updateWackedMole(payload) {
  return {
    type: UPDATE_WACKED_MOLE,
    payload,
  }
}

export function clearMolesInField() {
  return {
    type: CLEAR_ACTIVE_MOLES,
  }
}
