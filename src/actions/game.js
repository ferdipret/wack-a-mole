import {
  UPDATE_RUNNING_STATE,
  UPDATE_GAME_PHASE,
  GAME_OVER,
  SET_WACK_COUNT,
  SET_SCORE,
  RESET_GAME,
} from "../constants"

export function updateRunningState(payload) {
  return {
    type: UPDATE_RUNNING_STATE,
    payload,
  }
}

export function updateGamePhase() {
  return {
    type: UPDATE_GAME_PHASE,
  }
}

export function setGameOverValue(payload) {
  return {
    type: GAME_OVER,
    payload,
  }
}

export function setWackCount(payload) {
  return {
    type: SET_WACK_COUNT,
    payload,
  }
}

export function setScore(payload) {
  return {
    type: SET_SCORE,
    payload,
  }
}

export function resetGame() {
  return {
    type: RESET_GAME,
  }
}
