import gameReducer, { initialState } from "./game"
import {
  UPDATE_RUNNING_STATE,
  UPDATE_GAME_PHASE,
  GAME_OVER,
  SET_WACK_COUNT,
  SET_SCORE,
} from "../constants"

describe("gameReducer", () => {
  it("initializes state correctly", () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  it("updates the game's running state", () => {
    const payload = true
    expect(
      gameReducer(undefined, {
        type: UPDATE_RUNNING_STATE,
        payload,
      }),
    ).toEqual({ ...initialState, running: payload })
  })

  it("increments the game's phases", () => {
    expect(
      gameReducer(undefined, {
        type: UPDATE_GAME_PHASE,
      }),
    ).toEqual({ ...initialState, phase: initialState.phase + 1})
  })

  it("sets the `gameover` value", () => {
    const payload = true
    expect(gameReducer(undefined, {
      type: GAME_OVER,
      payload,
    })).toEqual({
      ...initialState,
      gameover: payload,
    })
  })

  it("sets the `uptimeWackCount`", () => {
    const payload = {uptimeWackCount: 2}
    expect(gameReducer(undefined, {
      type: SET_WACK_COUNT,
      payload,
    })).toEqual({
      ...initialState,
      uptimeWackCount: payload,
    })
  })

  it("sets the score and clears out the `uptimeWackCount`", () => {
    const payload = { uptimeWackCount: 2 }
    expect(gameReducer(undefined, {
      type: SET_SCORE,
      payload,
    })).toEqual({
      ...initialState,
      score: 4,
    })
  })
})
