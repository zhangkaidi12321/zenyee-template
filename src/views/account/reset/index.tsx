/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Input, Button, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { api } from 'Src/request'
import style from './style.less'

const { Password } = Input

const Reset = (): JSX.Element => {
	const history = useHistory()
	const path = history.location.pathname
	const secret: string = path.slice(path.lastIndexOf('/') + 1)
	const [info, setInfo] = useState({
		secret,
		password: '',
		confirmedPassword: ''
	})
	return (
		<div className={style.bg}>
			<div className={style.login}>
				<div className={style.l1}>
					<i className="dharma_logo" />
				</div>
				<div className={style.l2}>Reset Password</div>
				<div className={style.l3}>Input your new Password</div>
				<div className={style.l4}>
					<div className={style.line}>
						<Password
							placeholder="password"
							value={info.password}
							onChange={e => {
								setInfo({
									...info,
									password: e.target.value
								})
							}}
						/>
					</div>
					<div className={style.line}>
						<Password
							placeholder="confirmPassword"
							value={info.confirmedPassword}
							onChange={e => {
								setInfo({
									...info,
									confirmedPassword: e.target.value
								})
							}}
						/>
					</div>
				</div>
				<div className={style.l5}>
					<Button
						className={style.login}
						disabled={!(info.password && info.confirmedPassword)}
						onClick={() => {
							api({
								method: 'POST',
								url: '/api/dharma/resetPasswd',
								data: info
							}).then(res => {
								if (res.data) {
									localStorage.setItem('authToken', res.data.authenticationToken)
									notification.success({
										message: 'Password Reset successful'
									})
									setTimeout(() => {
										history.push('/login')
									}, 500)
								} else {
									notification.error({
										message: 'Password Reset failed'
									})
								}
							})
						}}
					>
						Reset
					</Button>
				</div>
				<div className={style.r6}>
					<div className={style.topLine}>
						<span
							onClick={() => {
								history.push('/login')
							}}
						>
							Back to Login
						</span>
					</div>
				</div>
			</div>
			<div className={style.btm}>Privacy and policies</div>
		</div>
	)
}

export default Reset
