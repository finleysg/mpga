import { useRef, useState } from "react"

import { Typeahead, TypeaheadRef } from "react-bootstrap-typeahead"

import { IRole } from "../../models/Clubs"
import { useGetRolesQuery } from "../member-clubs/memberClubApi"
import RoleList from "./RoleList"

interface RolePickerProps {
	selectedRoles: IRole[]
	OnChange: (currentRoles: IRole[]) => void
}

interface RoleData {
	id: string
	label: string
	name: string
}

const RolePicker = (props: RolePickerProps) => {
	const { data, isLoading } = useGetRolesQuery()
	const [roles, updateRoles] = useState(props.selectedRoles)
	const typeaheadRef = useRef<TypeaheadRef>()

	const roleData =
		data?.map((r) => {
			return {
				id: r.id.toString(),
				label: r.name,
				name: r.name,
			} as RoleData
		}) ?? []

	const handleSelect = (selected: RoleData) => {
		roles.push({
			id: +selected.id,
			role: selected.name,
		})
		const newRoles = roles.slice(0)
		updateRoles(newRoles)
		props.OnChange(newRoles)
		typeaheadRef.current?.clear()
	}

	const removeRole = (role: IRole) => {
		const idx = roles.findIndex((t) => t.role === role.role)
		if (idx >= 0) {
			const updatedRoles = roles.slice(0)
			updatedRoles.splice(idx, 1)
			updateRoles(updatedRoles)
			props.OnChange(updatedRoles)
		}
	}

	return (
		<div>
			{roleData && (
				<Typeahead
					id="role-picker"
					ref={typeaheadRef}
					filterBy={["name"]}
					placeholder="Search for roles..."
					isLoading={isLoading}
					minLength={1}
					allowNew={false}
					onChange={(selected) => {
						handleSelect(selected[0] as RoleData)
					}}
					options={roleData}
				/>
			)}
			<RoleList roles={roles} RemoveRole={removeRole} />
		</div>
	)
}

export default RolePicker
