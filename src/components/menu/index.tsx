import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import style from './style.less'

const { Item } = Menu

const Menus = (): JSX.Element => {
	const [list] = useState([
		{ key: '1', title: 'Dashboard', icon: 'fa fa-chart-bar', path: '/d/dashboard' },
		{ key: '2', title: 'Templates', icon: 'fa fa-paper-plane', path: '/d/templates' },
		{ key: '3', title: 'Existing Surveys', icon: 'fa fa-comments', path: '/d/surveys' },
		{ key: '4', title: 'People', icon: 'fa fa-user-friends', path: '/d/people/list' },
		{ key: '5', title: 'Subscription & Billing', icon: 'fa fa-credit-card', path: '/d/billing/1' }
	])

	const location = useLocation()
	const [path] = useState(list.find(i => i.path === location.pathname)?.key || '1')
	const [selectedKeys, setSelectedKeys] = useState([path])

	const history = useHistory()

	const menuClick = (i: any): void => {
		setSelectedKeys([i.key])
		history.push(list.find(j => j.key === i.key)?.path || list[0].path)
	}
	return (
		<Menu className={style.menu} onClick={menuClick} selectedKeys={selectedKeys} mode="inline">
			{list.map(i => (
				<Item key={i.key}><i className={i.icon} /> {i.title}</Item>
			))}
		</Menu>
	)
}

export default Menus
