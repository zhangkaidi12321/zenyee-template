import React from 'react'
import Loadable from 'react-loadable'
import Loading from '.'

const LoadableComponent = (loader: any): any => Loadable({
	loader,
	loading() {
		return <Loading />
	}
})

export default LoadableComponent
