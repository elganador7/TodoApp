import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TETableLink = styled(Link)`
	border: 1px solid ${(props) => props.theme.lightGray};
	border-radius: 5px;
	padding: 5px;
	text-align: center;
	text-decoration: none;
	font-size: 14px;
	display: block;

	color: ${(props) => props.theme.darkerGray};
	background-color: ${(props) => props.theme.white};

	transition: color 0.2s ease-in, background-color 0.2s ease-in;

	:active {
		color: ${(props) => props.theme.white};
		background-color: ${(props) => props.theme.primary};
	}
	:hover {
		color: ${(props) => props.theme.white};
		background-color: ${(props) => props.theme.primary};
	}
`

export default TETableLink
