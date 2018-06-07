import {
  UPDATE_ACTIVE_MOLES,
  UPDATE_WACKED_MOLE,
  CLEAR_ACTIVE_MOLES,
} from "../constants"
import { getRandomHoles } from "./helpers"

export const initialState = new Array(16).fill(undefined).map((mole, index) => {
  return {
    index,
    active: false,
    bomb: false,
    hidingTime: 55,
  }
})

const moles = (state = initialState, action) => {
  let newState

  switch (action.type) {
    case UPDATE_ACTIVE_MOLES: {
      const newHolesArray = getRandomHoles()
      newState = action.payload.moles.map(mole => ({
        ...mole,
        active:action.payload.addBomb &&
          newHolesArray.indexOf(mole.index) === 3
          ?  false
          : newHolesArray.indexOf(mole.index) !== -1,
        hidingTime: action.payload.uptime,
        bomb: action.payload.addBomb && newHolesArray[3] === mole.index,
      }))
      break
    }

    case CLEAR_ACTIVE_MOLES: {
      newState = state.map(mole => ({
        ...mole,
        active: false,
      }))
      break
    }

    case UPDATE_WACKED_MOLE: {
      newState = state.map(mole => ({
        ...mole,
        active: mole.index === action.payload ? false : mole.active,
      }))
      break
    }

    default: {
      newState = state
      break
    }
  }

  return newState
}

export default moles
