import React from 'react'
import ReactDOM from 'react-dom'
import { notification } from 'antd'
import less from 'less'
import 'Less/index.less'
import App from './app'
import 'Utils/rem'

if (module && module.hot) {
	module.hot.accept()
}

notification.config({
	duration: 2
})

less.modifyVars({
	'@primary-color': localStorage.getItem('themeColor') || '#24B5C1'
})

ReactDOM.render(<App />, document.querySelector('#app'))
