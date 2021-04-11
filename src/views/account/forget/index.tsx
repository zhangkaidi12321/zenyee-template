/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Input, Button, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { api } from 'Src/request'
import style from './style.less'

const Forget = (): JSX.Element => {
	const history = useHistory()
	const [email, setEmail] = useState('')
	return (
		<div className={style.bg}>
			<div className={style.login}>
				<div className={style.l1}>
					<i className="dharma_logo" />
				</div>
				<div className={style.l2}>Find Back</div>
				<div className={style.l3}>Input your Email</div>
				<div className={style.l4}>
					<div className={style.line}>
						<Input
							placeholder="Email"
							value={email}
							onChange={e => {
								setEmail(e.target.value)
							}}
						/>
					</div>
				</div>
				<div className={style.l5}>
					<Button
						className={style.login}
						disabled={!email}
						onClick={() => {
							api({
								method: 'POST',
								url: '/api/dharma/forgetPasswd',
								data: { email }
							}).then(res => {
								if (res.data) {
									notification.success({
										message: 'Send successful'
									})
								} else {
									notification.error({
										message: 'Send failed'
									})
								}
							})
						}}
					>
						Send
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

export default Forget
