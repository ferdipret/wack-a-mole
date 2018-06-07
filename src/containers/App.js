import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Field from "../components/Field"
import Timer from "../components/Timer"
import Button from "../components/Button"
import Title from "../components/Title"

import {
  updateTimer,
} from "../actions/timer"

import {
  updateRunningState,
  updateGamePhase,
  setGameOverValue,
  setWackCount,
  setScore,
  resetGame,
} from "../actions/game"

import {
  placeMolesInField,
  updateWackedMole,
  clearMolesInField,
} from "../actions/moles"

import {
  RUNNING_STATE_CHANGE,
  CHECK_FOR_MOLES,
  UPDATE_GAME_PHASE,
  GAME_OVER,
} from "../constants"

export class App extends Component {
  static propTypes = {
    updateTimer: PropTypes.func,
    placeMolesInField: PropTypes.func,
    running: PropTypes.bool.isRequired,
    timer: PropTypes.number.isRequired,
    phase: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gameover: PropTypes.bool.isRequired,
    bombCount: PropTypes.number.isRequired,
    uptimeWackCount: PropTypes.number.isRequired,
    updateRunningState: PropTypes.func,
    updateGamePhase: PropTypes.func,
    updateWackedMole: PropTypes.func,
    setWackCount: PropTypes.func,
    setGameOverValue: PropTypes.func,
    clearMolesInField: PropTypes.func,
    resetGame: PropTypes.func,
    setScore: PropTypes.func,
    moles: PropTypes.arrayOf(PropTypes.object),
  }

  constructor() {
    super()

    this.state = {
      intervalID: undefined,
      startTimer: undefined,
      currentTime: undefined,
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    let snapshot = []
    /**
     * To see if we should call our `updateTimerState` method,
     * we want to check whether the `running` state has changed
     */
    if (prevProps.running !== this.props.running) {
      // If it has changed we want to return a constant string
      snapshot = snapshot.concat(RUNNING_STATE_CHANGE)
    }

    /**
     * Each second that have gone by, we want to do some checks
     * First we'll address the issue of the field contianing moles
     */
    if (prevProps.timer !== this.props.timer) {
      if(this.props.timer === 0) {
        // If the time is zero, we want to end the game
        return snapshot = snapshot.concat(GAME_OVER)
      }

      snapshot = snapshot.concat(CHECK_FOR_MOLES)

      // If the timer has changed...
      if(this.props.timer % 10 === 0) {
        // ...we want to update the game phase every 10s
        snapshot = snapshot.concat(UPDATE_GAME_PHASE)
      }
    }

    return snapshot.length > 0 ? snapshot : null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * snapshot is whatever value get's returned from `getSnapshotBeforeUpdate`
     * by returning constant strings, we can enter a switch statement to handle
     * state changes and data manipulation
     */
    if (snapshot) {
      snapshot.map(snap => {
        switch (snap) {
          case GAME_OVER: {
            this.props.updateRunningState(false)
            this.props.setGameOverValue(true)
            return null
          }

          case RUNNING_STATE_CHANGE: {
            return this.updateTimerState(this.props.running, this.props.timer)
          }

          case CHECK_FOR_MOLES: {
            return this.checkForMoles()
          }

          case UPDATE_GAME_PHASE: {
            return this.props.updateGamePhase()
          }

          default: {
            return null
          }
        }
      })
    }
  }

  render() {
    const { timer, moles, score, running, gameover } = this.props

    return (
      <div>
        <Title>wack-a-mole</Title>
        <Button
          onClick={this.handleRunningStateToggle}
          running={running}
          gameover={gameover}
        />
        <div style={{
          color: "hsl(16, 25%, 38%)",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "20px",
        }}>
          <div>Score: {score}</div>
          <Timer timer={timer} />
        </div>
        <Field
          moles={moles}
          onMoleClick={this.handleMoleClick}
          running={running}
          timer={timer}
          score={score}
        />
      </div>
    )
  }

  /**
   * In order to get time constantly, ie Not depending on setInterval for time
   * we need to get our time from the `Date.now()` browser method, we can
   * then check whether the time has updated in 100ms intervals.
   *
   * We will store our intervalID in the component state, so that we can
   * easily clear it when the timer is not running.
   *
   * @param {boolean} isGameRunning - The game's running state
   * @param {number} currentTime - The `timer` state
   */
  updateTimerState = (isGameRunning, currentTime) => {
    if (isGameRunning && currentTime > 0) {
      this.setState({
        currentTime,
        startTimer: Date.now(),
        intervalID: setInterval(this.calcIntervalValue, 100),
      })
    } else {
      window.clearInterval(this.state.intervalID)
    }
  }

  calcIntervalValue = () => {
    const { timer, updateTimer } = this.props
    const { startTimer, currentTime } = this.state
    const payload = currentTime - Math.floor((Date.now() - startTimer) / 1000)
    if (timer !== payload) {
      updateTimer(payload)
    }
  }

  checkForMoles = () => {
    const {
      moles,
      placeMolesInField,
      timer,
      phase,
      clearMolesInField,
      uptimeWackCount,
      setScore,
      bombCount,
      running,
    } = this.props

    // Let's first see if we have moles active in the field
    const noMolesInField =
      moles.map(mole => mole.active).every(i => i === false)

    // Default uptime is really 5 but since we will use the game `phase` value
    // to set the uptime, it will be easier to add on to the default calculation
    const defaultUptime = 6
    const uptime =
      timer - (defaultUptime - phase > 1 ? defaultUptime - phase : 1)

    const addBomb = Math.floor(Math.random() * 100 + 1) < 30 && bombCount

    if (noMolesInField) {
      setScore({uptimeWackCount, addBomb})
      running && placeMolesInField({ moles, uptime, addBomb })
    } else if (moles[0].hidingTime === timer) {
      setScore({uptimeWackCount, addBomb: false})
      clearMolesInField()
    }
  }

  handleMoleClick = index => {
    const {
      moles,
      updateWackedMole,
      setWackCount,
      uptimeWackCount,
      clearMolesInField,
    } = this.props

    if (moles[index].bomb) {
      clearMolesInField()
      this.props.updateTimer(0)
    }

    if (moles[index].active) {
      setWackCount(uptimeWackCount + 1)
      updateWackedMole(index)
    }
  }

  /**
   * Will toggle our `running` state
   *
   * It get's called when the user click the start/pause button
   */
  handleRunningStateToggle = () => {
    const {
      running,
      updateRunningState,
      gameover,
      resetGame,
      updateTimer,
    } = this.props

    if (gameover) {
      updateTimer(60)
      resetGame()
    }
    updateRunningState(!running)
  }
}

function mapStateToProps({ timer, game, moles }) {
  return {
    timer,
    moles,
    running: game.running,
    phase: game.phase,
    uptimeWackCount: game.uptimeWackCount,
    score: game.score,
    bombCount: game.bombCount,
    gameover: game.gameover,
  }
}

const mapDispatchToProps = {
  updateTimer,
  updateRunningState,
  updateWackedMole,
  updateGamePhase,
  placeMolesInField,
  setGameOverValue,
  clearMolesInField,
  setWackCount,
  setScore,
  resetGame,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
