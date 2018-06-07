import {
  UPDATE_RUNNING_STATE,
  UPDATE_GAME_PHASE,
  GAME_OVER,
  SET_WACK_COUNT,
  SET_SCORE,
  RESET_GAME,
} from "../constants"

import { calculateScore } from "./helpers"

export const initialState = {
  running: false,
  phase: 1,
  gameover: false,
  uptimeWackCount: 0,
  score: 0,
  bombCount: 4,
}

const game = (state = initialState, action) => {
  let newState

  switch (action.type) {
    case GAME_OVER: {
      newState = {
        ...state,
        gameover: action.payload,
      }
      break
    }

    case RESET_GAME: {
      newState = initialState
      break
    }

    case UPDATE_RUNNING_STATE: {
      newState = {
        ...state,
        running: action.payload,
      }
      break
    }

    case SET_WACK_COUNT: {
      newState = {
        ...state,
        uptimeWackCount: action.payload,
      }
      break
    }

    case SET_SCORE: {
      newState = {
        ...state,
        uptimeWackCount: 0,
        score: state.score + calculateScore(action.payload.uptimeWackCount),
        bombCount: action.payload.addBomb
          ? state.bombCount - 1
          : state.bombCount,
      }
      break
    }

    case UPDATE_GAME_PHASE: {
      newState = {
        ...state,
        phase: state.phase + 1,
      }
      break
    }

    default: {
      newState = state
      break
    }
  }

  return newState
}

export default game
