import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TESideNavbar } from 'react-tec'

export const SideNavbar = styled(TESideNavbar)<{ sideNavActive?: boolean }>`
	position: fixed;
	top: 0px;
	bottom: 0px;
	max-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	z-index: 20;
	background-color: ${(props) => props.theme.white};
	overflow-y: auto;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 15px 0px, rgba(0, 0, 0, 0.05) 1px 0px 5px 0px;

	left: ${(props) => (props.sideNavActive ? '0px' : '-200px')};
	width: 200px;
	transition: left 0.25s ease-in-out, width 0.25s ease-in-out;

	@media (max-width: 1000px) {
		left: ${(props) => (props.sideNavActive ? '0px' : '-180px')};
		width: 180px;
	}
	@media (max-width: 800px) {
		left: ${(props) => (props.sideNavActive ? '0px' : '-160px')};
		width: 160px;
	}
	@media (max-width: 650px) {
		left: ${(props) => (props.sideNavActive ? '0px' : '-140px')};
		width: 140px;
	}

	@media print {
		display: none;
	}
`
export const LogoWrapper = styled.div`
	height: 130px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	@media (max-width: 800px) {
		height: 115px;
	}
	@media (max-width: 650px) {
		height: 105px;
	}
`
export const LogoLink = styled(Link)`
	text-decoration: none;
`
export const Logo = styled.img`
	object-fit: contain;
	width: 60px;
`
export const LogoText = styled.span`
	display: block;
	text-align: center;
	font-size: 26px;
	color: ${(props) => props.theme.primary};
	font-weight: 700;
	text-transform: uppercase;
`
