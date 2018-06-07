import { updateTimer } from "./timer"
import { UPDATE_TIMER } from "../constants"

it("creates an action to update the timer", () => {
  const payload = 12
  const expectedAction = {
    type: UPDATE_TIMER,
    payload,
  }

  expect(updateTimer(payload)).toEqual(expectedAction)
})
