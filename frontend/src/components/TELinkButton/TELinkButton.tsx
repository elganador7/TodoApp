import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TELinkButton = styled(Link)`
	display: block;
	text-align: center;
	border: 1px solid ${(props) => props.theme.lightGray};
	border-radius: 5px;
	text-decoration: none;
	padding: 5px 20px;
	font-size: 16px;

	color: ${(props) => props.theme.darkerGray};
	background-color: ${(props) => props.theme.white};
	transition: color 0.2s ease-in, background-color 0.2s ease-in, border 0.2s ease-in;

	:hover {
		color: ${(props) => props.theme.white};
		background-color: ${(props) => props.theme.primary};
		border: 1px solid ${(props) => props.theme.primary};
	}
	:active {
		color: ${(props) => props.theme.white};
		background-color: ${(props) => props.theme.primary};
		border: 1px solid ${(props) => props.theme.primary};
	}
`
export default TELinkButton
