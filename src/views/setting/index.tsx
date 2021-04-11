import { Button, Input, Checkbox, notification, Upload, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import ColorPicker from 'Components/color-picker'
import validateColor from 'validate-color'
import { api, upload } from 'Src/request'
import style from './style.less'
import CustomerLogo from '../../assets/image/customer_logo.png'

const Setting = (): JSX.Element => {
	const [info, setInfo] = useState<any>({
		email: '',
		brandLogoImage: '',
		brandName: '',
		brandColor: '',
		enableEssentials: false,
		enableMarking: false,
		enableNotifications: false,
		enableFeedback: false,
		oldPasswd: '',
		password: '',
		confirmedPassword: ''
	})
	const [checked, setChecked] = useState<Array<any>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [pwdVisible, setPwdVisible] = useState<boolean>(false)

	useEffect(() => {
		api({
			method: 'GET',
			url: '/api/dharma/user-info'
		}).then(res => {
			localStorage.setItem('themeColor', res.data.brandInfo.brandColor)
			less.modifyVars({
				'@primary-color': res.data.brandInfo.brandColor
			})
			setInfo({
				email: res.data.email,
				brandLogoImage: res.data.brandInfo.brandImage,
				brandName: res.data.brandInfo.brandName,
				brandColor: res.data.brandInfo.brandColor,
				enableEssentials: res.data.enableEssentials,
				enableMarking: res.data.enableMarking,
				enableNotifications: res.data.enableNotifications,
				enableFeedback: res.data.enableFeedback
			})
			const arr = {
				enableEssentials: res.data.enableEssentials,
				enableMarking: res.data.enableMarking,
				enableNotifications: res.data.enableNotifications,
				enableFeedback: res.data.enableFeedback
			}
			const result: Array<string> = []
			Object.entries(arr).forEach(i => {
				if (i[1]) {
					result.push(i[0])
				}
			})
			setChecked(result)
		})
	}, [])
	const { email, brandLogoImage, brandName, oldPasswd, password, confirmedPassword } = info

	return (
		<div className={style.setting}>
			<div className={style.account}>
				<div className="theme-color">Account Settings</div>
				<Button
					className={`theme-button ${style.btn}`}
					onClick={() => {
						const arr = ['enableEssentials', 'enableMarking', 'enableNotifications', 'enableFeedback']
						const obj: any = {}
						arr.forEach(i => {
							if (checked.includes(i)) {
								obj[i] = true
							} else {
								obj[i] = false
							}
						})
						api({
							method: 'POST',
							url: '/api/dharma/contact-setup',
							data: {
								...info,
								...obj
							}
						}).then(res => {
							if (res.data.brandInfo.brandName) {
								localStorage.setItem('dEmail', res.data.email)
								notification.success({
									message: 'Setup successful'
								})
							} else {
								notification.error({
									message: 'Setup failed'
								})
							}
						})
					}}
				>
					Save Changes
				</Button>
			</div>
			<div className={style.about}>About you</div>
			<div className={style.send}>Send Reminder emails to incomplete survey takers</div>
			<div className={style.info}>
				<div className={style.logo}>
					<Upload
						customRequest={e => {
							setLoading(true)
							upload({
								file: e.file,
								serviceType: 'DHARMA_PIC',
								successCb: (d: any) => {
									setInfo({
										...info,
										brandLogoImage: d.Location
									})
									setLoading(false)
								},
								errorCb: () => {
									setLoading(false)
								}
							})
						}}
						showUploadList={false}
					>
						{loading ? (
							<Spin />
						) : brandLogoImage ? (
							<img src={brandLogoImage} alt="logo" />
						) : (
							<img alt="logo" />
						)}
					</Upload>
				</div>
				<div className={style.brand}>
					<div className={style.brandName}>
						<Input
							className={style.brandInput}
							placeholder="Brand Name"
							value={brandName}
							onChange={e => {
								setInfo({
									...info,
									brandName: e.target.value
								})
							}}
						/>
					</div>
					<div className={style.email}>
						<Input
							className={style.brandInput}
							placeholder="Email Address"
							value={email}
							onChange={e => {
								setInfo({
									...info,
									email: e.target.value
								})
							}}
						/>
					</div>
					{pwdVisible && (
						<>
							<div className={style.email}>
								<Input
									className={style.brandInput}
									placeholder="Old Password"
									value={oldPasswd}
									onChange={e => {
										setInfo({
											...info,
											oldPasswd: e.target.value
										})
									}}
								/>
							</div>
							<div className={style.email}>
								<Input
									className={style.brandInput}
									placeholder="New Password"
									value={password}
									onChange={e => {
										setInfo({
											...info,
											password: e.target.value
										})
									}}
								/>
							</div>
							<div className={style.email}>
								<Input
									className={style.brandInput}
									placeholder="Confirm New Password"
									value={confirmedPassword}
									onChange={e => {
										setInfo({
											...info,
											confirmedPassword: e.target.value
										})
									}}
								/>
							</div>
						</>
					)}
					<div className={style.cp}>
						<Button
							className={`theme-button ${style.cpBtn}`}
							onClick={() => {
								setPwdVisible(!pwdVisible)
							}}
						>
							{pwdVisible ? 'Cancel' : 'Change Password'}
						</Button>
					</div>
				</div>
			</div>
			<div className={style.panel}>
				<div className={style.color}>Colours</div>
				<div className={style.how}>How do you want Dharma Index to look?</div>
				<div className={style.picker}>
					<div className={style.choose}>
						<div>Choose your colours</div>
						<div className={style.cp}>
							<ColorPicker
								cb={(val: string) => {
									setInfo({
										...info,
										brandColor: val
									})
								}}
							/>
						</div>
					</div>
					<div className={style.input}>
						<div className={style.ip1}>Got Brand colours instead?</div>
						<div className={style.ip2}>No problem</div>
						<div className={style.ip3}>
							<Input
								className={style.colorInput}
								placeholder="Brand Colours"
								value={info.brandColor}
								onChange={e => {
									setInfo({
										...info,
										brandColor: e.target.value
									})
									const hexCorrect = validateColor(e.target.value)
									less.modifyVars({
										'@primary-color': hexCorrect ? e.target.value : '#24b5c1'
									})
								}}
							/>
						</div>
					</div>
					<div className={`${style.img} theme`}>
						<i className={`${style.pa} fa fa-palette`} />
						<div className={style.text}>Make sure you can read this text clearly when you choose your colours.</div>
					</div>
				</div>
			</div>
			<div className={style.notification}>
				<div>Email and Notifications</div>
				<div>Opt in and out of emails</div>
				<div className={style.checkbox}>
					<Checkbox.Group
						value={checked}
						onChange={v => {
							setChecked(v)
						}}
						options={[
							{
								label: (
									<div style={{ width: '90%', display: 'inline-block', verticalAlign: 'top' }}>
										<div>Essentials (Required)</div>
										<div>
											We will just send you necessary emails like change of terms and conditions, receipts, billing etc
										</div>
									</div>
								),
								value: 'enableEssentials'
							},
							{
								label: (
									<div style={{ width: '90%', display: 'inline-block', verticalAlign: 'top' }}>
										<div>Marking and promotions</div>
										<div>
											Occasionally, we might send you exciting feature updates, tricks, tips, offers and things that are
											tailored to you.
										</div>
									</div>
								),
								value: 'enableMarking'
							},
							{
								label: (
									<div style={{ width: '90%', display: 'inline-block', verticalAlign: 'top' }}>
										<div>Notifications</div>
										<div>
											We will send you email on a weekly basis of how people in your database are doing and raise any
											concerns we spot.
										</div>
									</div>
								),
								value: 'enableNotifications'
							},
							{
								label: (
									<div style={{ width: '90%', display: 'inline-block', verticalAlign: 'top' }}>
										<div>Help us make the product better</div>
										<div>
											Your opinion matters and we're listening. We may send out emails asking how we can improve our
											platform or products. We aim to you the opportunity to give us feedback or raise issues.
										</div>
									</div>
								),
								value: 'enableFeedback'
							}
						]}
					/>
				</div>
			</div>
		</div>
	)
}

export default Setting
