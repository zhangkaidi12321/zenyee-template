import React from 'react'
import { Button, Modal } from 'antd'
import style from './index.less'

interface IProps {
	options: {
		icon: React.ReactNode
		title: string
    content: string
    operateZone: React.ReactNode
		cancelText?: string
		confirmText?: string
	}
  visible: boolean
  modalLoading: boolean
	isTheme?: boolean
	confirm: () => void
	cancel: () => void
}

const Dialog = ({ options, visible, confirm, cancel, modalLoading, isTheme }: IProps): JSX.Element => {
	const { icon, title, content, cancelText, confirmText, operateZone } = options
	return (
		<Modal
			visible={visible}
			footer={null}
			// width={1400}
			wrapClassName={style.modal}
			closeIcon={<i className={`${style.close} fa fa-times`} />}
			onCancel={cancel}
		>
			<div className={`${style.icon} ${isTheme ? 'theme' : ''}`}>{icon}</div>
			<div className={style.title}>{title}</div>
			<div className={style.content}>{content}</div>
      <div className={style.operateZone}>{operateZone}</div>
			<div className={style.footer}>
				<Button className="theme-button" onClick={confirm} loading={modalLoading}>
					{confirmText}
				</Button>
			</div>
		</Modal>
	)
}

export default Dialog
