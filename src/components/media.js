import { css } from "styled-components"

const sizes = {
  desktop: 1170,
  tablet: 768,
}

// iterate through the sizes and create a media template
export default Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
