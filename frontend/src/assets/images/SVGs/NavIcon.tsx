import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {}
const NavIcon: React.FC<Props> = (props) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 26' {...props}>
		<path d='M36 4H2a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4zm0 11H2a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4zm0 11H2a2 2 0 0 1 0-4h34a2 2 0 0 1 0 4z' />
	</svg>
)

export default NavIcon
