import React from 'react'
import { Button, Modal } from 'antd'
import style from './style.less'

interface IProps {
	options: {
		icon: React.ReactNode
		title: string
		content: string
		cancelText?: string
		confirmText?: string
	}
	visible: boolean
	confirm: () => void
	cancel: () => void
}

const Dialog = ({ options, visible, confirm, cancel }: IProps): JSX.Element => {
	const { icon, title, content, cancelText, confirmText } = options
	return (
		<Modal
			visible={visible}
			footer={null}
			// width={1400}
			wrapClassName={style.modal}
			closeIcon={<i className={`${style.close} fa fa-times`} />}
			onCancel={cancel}
		>
			<div className={`${style.icon} theme`}>{icon}</div>
			<div className={style.title}>{title}</div>
			<div className={style.content}>{content}</div>
			<div className={style.footer}>
				<Button className="theme-button" onClick={cancel}>
					{cancelText}
				</Button>
				<Button className="theme-button" onClick={confirm}>
					{confirmText}
				</Button>
			</div>
		</Modal>
	)
}

export default Dialog
