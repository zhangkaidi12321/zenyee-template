import React from 'react'
import { Dropdown, Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import style from './style.less'

const { Item } = Menu

const Header = (): JSX.Element => {
	const history = useHistory()

	return (
		<div className={style.head}>
			<div className={style.logo}>
				<div className="dharma_logo" />
				<i className="fa fa-th" />
			</div>
			<div className={style.bell}>
				<i className="fa fa-bell" />
			</div>
			<div className={style.user}>
				<Dropdown
					overlayClassName="userDrop"
					placement="bottomCenter"
					arrow
					overlay={
						<Menu>
							<Item
								key="0"
								onClick={() => {
									history.push('/d/setting')
								}}
							>
								setting
							</Item>
							<Item
								key="1"
								onClick={() => {
									localStorage.removeItem('authToken')
									history.push('/login')
								}}
							>
								logout
							</Item>
						</Menu>
					}
					trigger={['click']}
				>
					<i
						className="fa fa-user-circle"
					/>
				</Dropdown>
			</div>
		</div>
	)
}

export default Header
