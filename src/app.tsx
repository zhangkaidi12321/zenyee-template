import React, { FC, useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

export const MyContext: any = React.createContext(null)

const App: FC = () => {
	const col = JSON.parse(localStorage.getItem('collapse') || 'false')
	const [collapse, setCollapse] = useState(col)
	return (
		<MyContext.Provider
			value={{
				collapse,
				setCollapse
			}}
		>
			<HashRouter>{renderRoutes(routes)}</HashRouter>
		</MyContext.Provider>
	)
}

export default App
