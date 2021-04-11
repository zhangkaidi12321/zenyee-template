import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import less from 'less'

interface IProps {
	cb: (val: string) => void
}

const ColorPicker = (props: IProps): JSX.Element => {
	const { cb } = props
	const curColor = localStorage.getItem('themeColor') || '#24B5C1'
	const [color, setColor] = useState(curColor)

	return (
		<CirclePicker
			color={color}
			circleSize={18}
			circleSpacing={10}
			onChange={val => {
				less.modifyVars({
					'@primary-color': val.hex
				})
				setColor(val.hex)
				cb(val.hex)
			}}
		/>
	)
}

export default ColorPicker
