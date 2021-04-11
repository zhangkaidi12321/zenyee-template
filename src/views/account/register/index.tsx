/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Input, Checkbox, Button, notification } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from 'Src/request'
import style from './style.less'

const { Password } = Input

const Register = (): JSX.Element => {
	const history = useHistory()
	const [account, setAccount] = useState({
		email: '',
		name: '',
		password: '',
		confirmedPassword: ''
	})
	const { email, name, password, confirmedPassword } = account
	const [check, setCheck] = useState({
		check1: false,
		check2: false
	})
	return (
		<div className={style.bg}>
			<div className={style.register}>
				<div className={style.r1}>
					<i className="dharma_logo" />
				</div>
				<div className={style.r2}>Create an account</div>
				<div className={style.r3}>
					<div className={style.line}>
						<div className={style.sel}>
							<Input
								placeholder="Email"
								value={email}
								onChange={e => {
									setAccount({
										...account,
										email: e.target.value
									})
								}}
							/>
						</div>
						<div className={style.sel}>
							<Input
								placeholder="Name"
								value={name}
								onChange={e => {
									setAccount({
										...account,
										name: e.target.value
									})
								}}
							/>
						</div>
					</div>
					<div className={style.line}>
						<div className={style.sel}>
							<Password
								placeholder="Password"
								value={password}
								onChange={e => {
									setAccount({
										...account,
										password: e.target.value
									})
								}}
							/>
						</div>
						<div className={style.sel}>
							<Password
								placeholder="Confirm Password"
								value={confirmedPassword}
								onChange={e => {
									setAccount({
										...account,
										confirmedPassword: e.target.value
									})
								}}
							/>
						</div>
					</div>
				</div>
				<div className={style.r4}>
					<div className={style.box}>
						<Checkbox
							checked={check.check1}
							onChange={e => {
								setCheck({
									...check,
									check1: e.target.checked
								})
							}}
						>
							By creating an account, I agree to the terms of service and privacy policy
						</Checkbox>
					</div>
					<div className={style.box}>
						<Checkbox
							checked={check.check2}
							onChange={e => {
								setCheck({
									...check,
									check2: e.target.checked
								})
							}}
						>
							Occasionally, we might send you exciting features, updates, tricks, tips, offers and things that are
							tailored to you. You can opt out at any time.
						</Checkbox>
					</div>
				</div>
				<div className={style.r5}>
					<Button
						className={style.continue}
						disabled={!(email && name && password && confirmedPassword && check.check1 && check.check2)}
						onClick={() => {
							api({
								method: 'POST',
								url: '/api/dharma/sign-up',
								data: account
							}).then(res => {
								if (res.data.authenticationToken) {
									localStorage.setItem('authToken', res.data.authenticationToken)
									localStorage.setItem('dEmail', res.data.email)
									notification.success({
										message: 'Register successful'
									})
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
										message: 'Register failed'
									})
								}
							})
						}}
					>
						Continue
					</Button>
				</div>
				<div className={style.r6}>
					<div className={style.topLine}>
						<span>Have an account?</span>
						<span
							onClick={() => {
								history.push('/login')
							}}
						>
							Log in
						</span>
					</div>
				</div>
			</div>
			<div className={style.btm}>Privacy and policies</div>
		</div>
	)
}

export default Register
