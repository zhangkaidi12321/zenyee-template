/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Input, Button, Upload, notification, Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import validateColor from 'validate-color'
import ColorPicker from 'Components/color-picker'
import less from 'less'
import { api, upload } from 'Src/request'
import style from './style.less'

const Setup = (): JSX.Element => {
	const history = useHistory()
	const [loading, setLoading] = useState(false)
	const [brand, setBrand] = useState({
		brandColor: '#24b5c1',
		brandLogoImage: '',
		brandName: ''
	})

	return (
		<div className={style.bg}>
			<div className={style.setup}>
				<div className={`${style.title} theme-color`}>Let's get you set up</div>
				<div className={style.desc}>You can always change these settings later.</div>
				<div className={style.panel}>
					<div className={style.p1}>
						<div className={style.i1}>
							<i className="fa fa-user" />
						</div>
						<div className={style.upload}>
							<div className={`${style.u1} theme`}>1</div>
							<div className={style.u2}>Upload your Logo</div>
							<div className={style.u3}>
								<Upload
									customRequest={e => {
										setLoading(true)
										upload({
											file: e.file,
											serviceType: 'DHARMA_PIC',
											successCb: (d: any) => {
												setBrand({
													...brand,
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
									) : brand.brandLogoImage ? (
										<img className={style.upLogo} src={brand.brandLogoImage} alt="" />
									) : (
										<div className={style.upLogo}>
											<i className="fa fa-upload" />
										</div>
									)}
								</Upload>
							</div>
						</div>
						<div className={style.brand}>
							<div className={style.b1}>
								<div className="theme">2</div>
							</div>
							<div className={style.b2}>
								<div>What's your brand name? *</div>
								<div className={style.brandName}>
									<Input
										className={style.input}
										placeholder="Name of your brand"
										value={brand.brandName}
										onChange={e => {
											setBrand({
												...brand,
												brandName: e.target.value
											})
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={style.p2}>
						<div className={style.i2}>
							<i className="fa fa-palette" />
						</div>
						<div className={style.palette}>
							<div className={style.choose}>
								<div className="theme">3</div>
								<div>Choose your colours</div>
								<div className={style.cp}>
									<ColorPicker
										cb={(val: string) => {
											setBrand({
												...brand,
												brandColor: val
											})
										}}
									/>
								</div>
								<div className={style.ip1}>Got Brand colours instead?</div>
								<div className={style.ip2}>No problem</div>
								<div className={style.ip3}>
									<Input
										className={style.colorInput}
										placeholder="Brand Colours"
										value={brand.brandColor}
										onChange={e => {
											setBrand({
												...brand,
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
							<div className={style.example}>
								<div className={style.e1}>
									<div className={style.eTitle}>Example</div>
									<div className={style.img1} />
								</div>
								<div className={style.e2}>
									<div className={`${style.img2} theme`}>
										<i className={`${style.pa} fa fa-palette`} />
										<div className={style.text}>
											Make sure you can read this text clearly when you choose your colours.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={style.done}>
					<Button
						className={`theme-button ${style.btn}`}
						disabled={!brand.brandName || !brand.brandLogoImage}
						onClick={() => {
							api({
								method: 'POST',
								url: '/api/dharma/contact-setup',
								data: brand
							}).then(res => {
								if (res.data.brandInfo.brandName) {
									notification.success({
										message: 'Setup successful'
									})
									setTimeout(() => {
										history.push('/d/templates')
									}, 500)
								} else {
									notification.error({
										message: 'Setup failed'
									})
								}
							})
						}}
					>
						I'm done
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Setup
