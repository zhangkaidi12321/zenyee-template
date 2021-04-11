/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import loadable from 'Components/loading/loadable'
import { Redirect } from 'react-router-dom'

const routes = [
	{
		path: '/',
		exact: true,
		render: () => <Redirect to="/d/dashboard" />
	},
	{
		path: '/register',
		component: loadable(() => import('Views/account/register'))
	},
	{
		path: '/login/:verify?',
		component: loadable(() => import('Views/account/login'))
	},
	{
		path: '/setup',
		component: loadable(() => import('Views/account/setup'))
	},
	{
		path: '/forget',
		component: loadable(() => import('Views/account/forget'))
	},
	{
		path: '/reset/:token',
		component: loadable(() => import('Views/account/reset'))
	},
	{
		path: '/d',
		component: loadable(() => import('Components/wrapper')),
		routes: [
			{
				path: '/d/dashboard',
				component: loadable(() => import('Views/dashboard/list'))
			},
			{
				path: '/d/setting',
				component: loadable(() => import('Views/setting'))
			},
			{
				path: '/d/404',
				component: loadable(() => import('Components/not-found'))
			},
			{
				path: '/d/*',
				render: () => <Redirect to="/d/404" />
			}
		]
	},
	{
		path: '*',
		render: () => <Redirect to="/d/404" />
	}
]

export default routes
