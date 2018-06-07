import gameReducer, { initialState } from "./game"
import {
  UPDATE_RUNNING_STATE,
  UPDATE_GAME_PHASE,
  GAME_OVER,
  SET_WACK_COUNT,
  SET_SCORE,
  RESET_GAME,
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

  it(`sets the score and clears out the 'uptimeWackCount'
    it will also update the 'bombCount'`, () => {
    const noBombPayload = { uptimeWackCount: 2 }
    expect(gameReducer(undefined, {
      type: SET_SCORE,
      payload: noBombPayload,
    })).toEqual({
      ...initialState,
      score: 4,
    })

    const bombPayload = { uptimeWackCount: 2, addBomb: true }
    expect(gameReducer(undefined, {
      type: SET_SCORE,
      payload: bombPayload,
    })).toEqual({
      ...initialState,
      score: 4,
      bombCount: 3,
    })
  })

  it(`resets the game
    by setting the initial state for the game reducer`, () => {
    expect(gameReducer(undefined, {
      type: RESET_GAME,
    })).toEqual(initialState)
  })
})
