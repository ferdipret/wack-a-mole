import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Mole from "./Mole"
import Overlay from "./Overlay"

const FieldWrapper = styled.div`
  background: hsl(120, 50%, 70%);
  display: flex
  font-family: 'Share Tech Mono', monospace;
  flex-wrap: wrap;
  position: relative;
`

function Field({moles, onMoleClick, running, timer, score}) {
  const getOverlayState = t =>  {
    switch(t) {
      case 60: {
        return <span>Click the `START` button to begin a game</span>
      }

      case 0: {
        return (
          <div>
            <h2>GAME OVER!</h2>
            <h3>score</h3>
            <h1>{score}</h1>
          </div>
        )
      }

      default: {
        return <span>Game Paused</span>
      }
    }
  }
  return (
    <FieldWrapper>
      {!running && <Overlay>{getOverlayState(timer)}</Overlay>}
      {moles.map(mole => (
        <Mole key={mole.index} {...mole} onMoleClick={onMoleClick}/>
      ))}
    </FieldWrapper>
  )
}

Field.propTypes = {
  moles: PropTypes.arrayOf(PropTypes.object),
  onMoleClick: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default Field
