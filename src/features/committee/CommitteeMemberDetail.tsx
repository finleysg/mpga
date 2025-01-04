import { useRef } from "react"

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit"
import usePermissions from "../../utilities/Permissions"
import CommitteeMemberEdit from "./CommitteeMemberEdit"
import CommitteeMemberView from "./CommitteeMemberView"
import { ExecutiveCommitteeDetail } from "./committeePropTypes"

const CommitteeMemberDetail = (props: ExecutiveCommitteeDetail) => {
	const { committeeMember, edit, onClose } = props
	const permissions = usePermissions()
	const closeRef = useRef<CloseHandle>()

	const handleClose = () => {
		closeRef.current?.close()
		onClose()
	}

	return (
		<CloseableEditContainer
			ref={closeRef}
			initEdit={edit}
			canEdit={permissions.canEditCommittee()}
			viewComponent={<CommitteeMemberView committeeMember={committeeMember} />}
			editComponent={
				<CommitteeMemberEdit committeeMember={committeeMember} onClose={handleClose} />
			}
		/>
	)
}

export default CommitteeMemberDetail
