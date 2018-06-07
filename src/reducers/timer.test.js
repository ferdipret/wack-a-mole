import timerReducer from "./timer"
import { UPDATE_TIMER } from "../constants"

describe("timerReducer", () => {
  it("should initialize state with `60`{number}", () => {
    expect(timerReducer(undefined, {})).toEqual(60)
  })

  it("updates the timer state", () => {
    const payload = 12

    expect(
      timerReducer(undefined, {
        type: UPDATE_TIMER,
        payload,
      })
    ).toEqual(12)
  })
})
