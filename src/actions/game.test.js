import {
  UPDATE_RUNNING_STATE,
  UPDATE_GAME_PHASE,
  GAME_OVER,
  SET_WACK_COUNT,
  SET_SCORE,
  RESET_GAME,
} from "../constants"
import {
  updateRunningState,
  updateGamePhase,
  setGameOverValue,
  setWackCount,
  setScore,
  resetGame,
} from "./game"

it("creates an action to set the game's running state", () => {
  const payload = false
  const expectedAction = {
    type: UPDATE_RUNNING_STATE,
    payload,
  }

  expect(updateRunningState(payload)).toEqual(expectedAction)
})

it("creates an action to set the game's phase value", () => {
  const expectedAction = {
    type: UPDATE_GAME_PHASE,
  }

  expect(updateGamePhase()).toEqual(expectedAction)
})

it("creates an action to set the `gameover` value", () => {
  const payload = true
  const expectedAction = {
    type: GAME_OVER,
    payload,
  }

  expect(setGameOverValue(payload)).toEqual(expectedAction)
})

it("increment the `uptimeWackCount`", () => {
  const payload = 2
  const expectedAction = {
    type: SET_WACK_COUNT,
    payload,
  }

  expect(setWackCount(payload)).toEqual(expectedAction)
})

it("creates an action to set the score", () => {
  const payload = 2
  const expectedAction = {
    type: SET_SCORE,
    payload,
  }

  expect(setScore(payload)).toEqual(expectedAction)
})

it("creates an action to reset the game", () => {
  const expectedAction = {
    type: RESET_GAME,
  }

  expect(resetGame()).toEqual(expectedAction)
})
