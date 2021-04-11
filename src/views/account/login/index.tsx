/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { Input, Button, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { api } from 'Src/request'
import style from './style.less'

const { Password } = Input

const Login = (): JSX.Element => {
	const history = useHistory()
	const [info, setInfo] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		const { pathname } = history.location
		const verify = pathname.slice(pathname.lastIndexOf('/') + 1)
		if (verify && verify !== 'login') {
			api({
				method: 'POST',
				url: '/api/dharma/verifiedEmail',
				data: {
					verifiedSecret: verify
				}
			}).then(res => {
				if (res.data.emailVerified) {
					history.push('/login')
					notification.success({
						message: 'Email verify successful'
					})
				}
			})
		}
	}, [])

	return (
		<div className={style.bg}>
			<div className={style.login}>
				<div className={style.l1}>
					<i className="dharma_logo" />
				</div>
				<div className={style.l2}>Welcome Back</div>
				<div className={style.l3}>Log in to your account</div>
				<div className={style.l4}>
					<div className={style.line}>
						<Input
							placeholder="Email"
							value={info.email}
							onChange={e => {
								setInfo({
									...info,
									email: e.target.value
								})
							}}
						/>
					</div>
					<div className={style.line}>
						<Password
							placeholder="Password"
							value={info.password}
							onChange={e => {
								setInfo({
									...info,
									password: e.target.value
								})
							}}
						/>
					</div>
					<div
						className={style.pwd}
						onClick={() => {
							history.push('/forget')
						}}
					>
						Forgotten Password?
					</div>
				</div>
				<div className={style.l5}>
					<Button
						className={style.login}
						disabled={!(info.email && info.password)}
						onClick={() => {
							api({
								method: 'POST',
								url: '/api/dharma/login',
								data: info
							}).then(res => {
								if (res.data.authenticationToken) {
									localStorage.setItem('authToken', res.data.authenticationToken)
									localStorage.setItem('dEmail', res.data.email)
									localStorage.setItem('themeColor', res.data.brandInfo.brandColor || '#24b5c1')
									less.modifyVars({
										'@primary-color': res.data.brandInfo.brandColor || '#24b5c1'
									})
									notification.success({
										message: 'Login successful'
									})
									// res.data.alreadyPaid = true
									// res.data.emailVerified = true
									if (res.data.alreadyPaid && res.data.emailVerified && res.data.brandInfo.brandName) {
										setTimeout(() => {
											history.push('/d/templates')
										}, 500)
									} else if (res.data.alreadyPaid && res.data.emailVerified) {
										history.push('/setup')
									} else if (res.data.alreadyPaid) {
										history.push('/success')
									} else {
										history.push('/pre')
									}
								} else {
									notification.error({
										message: 'Login failed'
									})
								}
							})
						}}
					>
						Login
					</Button>
				</div>
				<div className={style.r6}>
					<div className={style.topLine}>
						<span>Don't have an account?</span>
						<span
							onClick={() => {
								history.push('/register')
							}}
						>
							Sign Up
						</span>
					</div>
				</div>
			</div>
			<div className={style.btm}>Privacy and policies</div>
		</div>
	)
}

export default Login
