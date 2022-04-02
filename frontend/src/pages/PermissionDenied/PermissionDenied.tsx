import React from 'react'
import { TEErrorLoadingAlert } from 'react-tec'

const PermissionDenied: React.FC = () => {
	return (
		<TEErrorLoadingAlert
			title='Permission Denied'
			message={
				<>
					You do not have the required permissions to load this page.
					<br />
					If you believe you are seeing this in error, please contact your system admin or
					the Rittal IT staff at <a href='mailto:'>SOME EMAIL HERE</a>.
				</>
			}
		/>
	)
}

export default PermissionDenied
