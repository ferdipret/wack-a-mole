import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const TimeWrapper = styled.div`
  text-align: right;
`

function Timer({ timer }) {
  return <TimeWrapper>Time remaining: {timer}</TimeWrapper>
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
}

export default Timer
