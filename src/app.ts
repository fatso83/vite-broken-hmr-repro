import 'dayjs/locale/nb'

import React from 'react'
import ReactDOM from 'react-dom'

import AppWrapper from './AppWrapper'

function getContainerElement(): HTMLElement | null {
  return document.getElementById('nimble-app')
}

ReactDOM.render(React.createElement(AppWrapper, {}), getContainerElement())
