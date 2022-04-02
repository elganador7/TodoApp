import styled from 'styled-components'
import { TEPanelWrapper, TEPanel, TEInputRow, TEButton } from 'react-tec'

export const PanelWrapper = styled(TEPanelWrapper)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`
export const Panel = styled(TEPanel)`
	margin: 0px auto;
	max-width: 600px;
`
export const Title = styled.h1`
	text-align: center;
	font-size: 40px;
	margin-top: 5px;
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid ${(props) => props.theme.darkerGray};
	color: ${(props) => props.theme.primary};
`
export const FormTitle = styled.h2`
	text-align: center;
	font-size: 34px;
	margin-top: 5px;
	margin-bottom: 25px;
`
export const InputRow = styled(TEInputRow)``
export const Button = styled(TEButton)`
	padding-top: 10px;
	padding-bottom: 10px;
	margin-top: 10px;
`
