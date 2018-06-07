import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const ButtonWrapper = styled.button`
  background-color: white;
  border: 1px solid hsl(120, 50%, 70%);
  border-radius: 2px;
  color: hsl(120, 50%, 70%);
  cursor: pointer;
  display: flex;
  font-family: 'Share Tech Mono', monospace;
  font-size: 18px;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  width: 120px;

  &:hover {
    border: 1px solid hsl(120, 50%, 60%);
    color: hsl(120, 50%, 60%);
  }

  &:focus {
    outline: none;
  }
`

function Button ({running, onClick, gameover}) {
  return (
    <ButtonWrapper onClick={onClick} className="main-btn">
      {gameover
        ? "RESTART"
        : running ? "PAUSE": "START"
      }
    </ButtonWrapper>
  )
}

Button.propTypes = {
  running: PropTypes.bool,
  onClick: PropTypes.func,
  gameover: PropTypes.bool,
}

export default Button
