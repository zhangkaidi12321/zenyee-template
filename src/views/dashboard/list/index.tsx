import React, { useState } from 'react'
import Modal from 'Src/components/modal'
import { Button } from 'antd'

const Dashboard = (): JSX.Element => {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			{/* <Button onClick={() => {
				setVisible(true)
			}}>123</Button> */}
			<Modal
				options={{
					icon: <i className="fas fa-paper-plane" />,
					title: 'Send this survey again?',
					content:
						'Let’s review the information and see if there’s any changes you would like to make before we get sending.',
					cancelText: 'Dont’t Send',
					confirmText: 'Review and Send'
				}}
				confirm={() => {
					console.log(123)
				}}
				cancel={() => {
					setVisible(false)
				}}
				visible={visible}
			/>
		</div>
	)
}

export default Dashboard
