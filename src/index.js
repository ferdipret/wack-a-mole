import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import { Provider } from "react-redux"
import logger from "redux-logger"
import App from "./containers/App"

import "./stylesReset"

const store = createStore(rootReducer, applyMiddleware(logger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
