import React from "react"

import Table from "react-bootstrap/Table"
import styled from "styled-components"

import LoadingContainer from "../../components/LoadingContainer"
import { Team } from "../../models/Clubs"
import { useGetTeamsQuery } from "./matchPlayApi"
import TeamRow from "./TeamRow"

const FilterButton = styled.a`
	margin: 0;
	cursor: pointer;
`
FilterButton.displayName = "FilterButton"

const GroupColumn = styled.th`
	min-width: 120px;
	max-width: 150px;
`
GroupColumn.displayName = "GroupColumn"

export function TeamList() {
	const { teams, isLoading } = useGetTeamsQuery(undefined, {
		selectFromResult: (result) => ({
			teams: result.data?.map((t) => new Team(t)) || [],
			...result,
		}),
	})

	let groupName = ""

	return (
		<LoadingContainer loading={isLoading}>
			<Table striped size="sm">
				<thead>
					<tr>
						<th></th>
						<GroupColumn>Group</GroupColumn>
						<th>Club</th>
						<th>Captain(s)</th>
					</tr>
				</thead>
				<tbody>
					{teams?.map((team: Team) => {
						const addSpace = groupName !== "" && team.groupName !== groupName
						groupName = team.groupName
						return <TeamRow key={team.id} team={team} addSpace={addSpace} />
					})}
				</tbody>
			</Table>
		</LoadingContainer>
	)
}
