import { Button } from 'antd'
import React from 'react'
import style from './style.less'

const NotFound = (): JSX.Element => {
	return (
		<div className={style.notFount}>
			<div className={`not_found st ${style.img}`} />
			<div className={style.content}>
				<div className={`${style.n1} theme-color`}>Oh No!</div>
				<div className={style.n2}>We can't seem to find the page you're looking for.</div>
				<div className={style.n3}>Please contact our support team if you are still having problems.</div>
				<div className={style.n4}>
					<Button className={`theme-button ${style.contact}`}>Contact us</Button>
				</div>
			</div>
		</div>
	)
}

export default NotFound
