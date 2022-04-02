import styled from 'styled-components'
import { TEButton } from 'react-tec'

const TEPanelActionButton = styled(TEButton)`
	font-size: 16px;
	flex-shrink: 0;
	width: auto;

	@media (max-width: 800px) {
		font-size: 15px;
		padding: 5px 15px;
	}
	@media (max-width: 650px) {
		font-size: 14px;
		padding: 5px 10px;
	}
`

export default TEPanelActionButton
