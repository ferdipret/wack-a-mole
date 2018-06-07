import { UPDATE_TIMER } from "../constants"

const timer = (state = 60, action) => {
  let newState

  switch (action.type) {
    case UPDATE_TIMER: {
      newState = action.payload
      break
    }

    default: {
      newState = state
      break
    }
  }

  return newState
}

export default timer
