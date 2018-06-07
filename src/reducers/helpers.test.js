import { getRandomHoles, calculateScore } from "./helpers"

it("`getRandomHoles` should return an array with 4 unique values", () => {
  expect(getRandomHoles()).toHaveLength(4)
})

it("`calculateScore` takes a number between 0 - 4, and calculates the score", () => {
  expect(calculateScore(0)).toEqual(0)
  expect(calculateScore(1)).toEqual(1)
  expect(calculateScore(2)).toEqual(4)
  expect(calculateScore(3)).toEqual(16)
  expect(calculateScore(4)).toEqual(256)
})
