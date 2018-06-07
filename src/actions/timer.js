import { UPDATE_TIMER } from "../constants"

export function updateTimer(payload) {
  return {
    type: UPDATE_TIMER,
    payload,
  }
}
