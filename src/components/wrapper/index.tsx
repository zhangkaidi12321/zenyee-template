/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react'
import { Button, Layout } from 'antd'
import { renderRoutes } from 'react-router-config'
import { useHistory } from 'react-router-dom'
import Headers from 'Components/header'
import Menus from 'Components/menu'
import Standard from '../../assets/image/standard.png'
import style from './style.less'
import { MyContext } from '../../app'

const { Header, Sider, Content } = Layout

const Brand = (): JSX.Element => {
	const { collapse, setCollapse } = useContext(MyContext)
	return (
		<div className={style.brand}>
			<div>
				<i
					className={`fas ${collapse ? 'fa-expand' : 'fa-compress'}`}
					onClick={() => {
						setCollapse(!collapse)
						localStorage.setItem('collapse', `${!collapse}`)
					}}
				/>
			</div>
			{collapse ? (
				''
			) : (
				<div className={style.standard}>
					<img alt="" />
				</div>
			)}
		</div>
	)
}

const Send = (): JSX.Element => {
	const { collapse } = useContext(MyContext)
	if (collapse) {
		return (
			<div className={`theme ${style.planeWrapper}`}>
				<i className={`fas fa-paper-plane ${style.plane}`} />
			</div>
		)
	}
	return (
		<div className={style.send}>
			<Button className={`theme-button ${style.sendBtn}`} icon={<i className="fas fa-paper-plane" />}>
				Send New
			</Button>
		</div>
	)
}

const Wrapper = (props: any): JSX.Element => {
	const { route } = props
	const { collapse } = useContext(MyContext)
	const history = useHistory()
	const showWholePage = history.location.pathname.match('/d/preview') || history.location.pathname.match('/d/survey/')
	useEffect(() => {
		if (!localStorage.getItem('authToken') && !history.location.pathname.match('/d/survey/')) {
			history.push('/login')
		}
	}, [history.location.pathname])
	return (
		<Layout>
			<Sider theme="light" style={{ display: showWholePage ? 'none' : '' }} className={collapse ? style.sideCol : style.side} collapsed={collapse}>
				<Brand />
				<Menus />
				<Send />
			</Sider>
			<Layout className={style.layout}>
				<Header style={{ display: showWholePage ? 'none' : '' }}>
					<Headers />
				</Header>
				<Content style={ showWholePage ? { padding: 0 } : {}}>{renderRoutes(route.routes)}</Content>
			</Layout>
		</Layout>
	)
}

export default Wrapper
