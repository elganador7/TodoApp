import styled from 'styled-components'
import { TEButton } from 'react-tec'

import NavIcon from 'assets/images/SVGs/NavIcon'

export const Container = styled.nav`
	width: 100%;
	padding-left: 10px;
	height: 60px;
	background-color: ${(props) => props.theme.white};
	@media (max-width: 800px) {
		height: 50px;
	}
	@media (max-width: 650px) {
		height: 45px;
	}
	@media print {
		display: none;
	}
`
export const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	padding-right: 30px;
	padding-top: 10px;
	padding-bottom: 10px;
	height: 100%;
	@media (max-width: 450px) {
		padding-right: 20px;
	}
`
export const LeftWrapper = styled.div`
	display: flex;
	align-items: center;
`
export const SlideNavButton = styled(TEButton)`
	width: 35px;
	height: 30px;
	padding: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	margin-right: 10px;
	background-color: transparent;
	@media (max-width: 650px) {
		width: 32px;
		height: 28px;
	}
`
export const SlideNavIcon = styled(NavIcon)`
	width: 100%;
	height: auto;
	fill: currentColor;
`
export const Title = styled.h1`
	font-size: 28px;
	margin-top: 0px;
	margin-bottom: 0px;
	color: ${(props) => props.theme.primary};
	@media (max-width: 1000px) {
		font-size: 26px;
	}
	@media (max-width: 800px) {
		font-size: 24px;
	}
	@media (max-width: 650px) {
		font-size: 20px;
	}
`
export const SignOutButton = styled(TEButton)`
	border: none;
	width: auto;
	padding: 0px;
	font-size: 16px;
	background-color: transparent;
	:active {
		border: none;
		color: ${(props) => props.theme.primary};
		background: transparent;
	}
	:hover {
		border: none;
		color: ${(props) => props.theme.primary};
		background: transparent;
	}
	@media (max-width: 800px) {
		font-size: 15px;
	}
	@media (max-width: 650px) {
		font-size: 14px;
	}
`
