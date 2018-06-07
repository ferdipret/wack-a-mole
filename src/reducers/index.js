import { combineReducers } from "redux"
import timer from "./timer"
import game from "./game"
import moles from "./moles"

export default combineReducers({ timer, game, moles })
