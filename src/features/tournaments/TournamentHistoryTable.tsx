import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"

import LoadingContainer from "../../components/LoadingContainer"
import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events"
import { ITournamentWinnerData } from "../../services/Data"
import usePermissions from "../../utilities/Permissions"
import { useGetTournamentWinnersQuery } from "./tournamentApi"
import { TournamentDetailProps } from "./tournamentPropTypes"
import TournamentWinnerEditModal from "./TournamentWinnerEditModal"
import TournamentWinnerGroup from "./TournamentWinnerGroup"

const TournamentHistoryTable: React.FC<TournamentDetailProps> = (props) => {
	const { tournament } = props

	const [doEdit, updateDoEdit] = useState(false)
	const [winnerToEdit, updateWinnerToEdit] = useState<TournamentWinner>()

	// const [doSearch, updateDoSearch] = useState(false);
	// const [search, updateSearch] = useState({});
	const permissions = usePermissions()
	const { groups, isLoading } = useGetTournamentWinnersQuery(tournament.systemName, {
		selectFromResult: (result) => ({
			groups: result.data?.reduce((acc: ITournamentWinnerGroup[], item: ITournamentWinnerData) => {
				const group = acc.find((g) => g.year === item.year)
				if (group) {
					group.winners.push(new TournamentWinner(item))
				} else {
					acc.push({
						year: item.year,
						location: item.location,
						tournament: tournament,
						winners: [new TournamentWinner(item)],
					})
				}
				return acc
			}, []),
			...result,
		}),
	})

	const handleClose = () => {
		updateDoEdit(false)
	}

	const handleEdit = (winner?: TournamentWinner) => {
		if (!winner) {
			updateWinnerToEdit(new TournamentWinner({ id: 0, tournament: tournament.id }))
		} else {
			updateWinnerToEdit(winner)
		}
		updateDoEdit(true)
	}

	// const searchWinners = (search: ITournamentHistorySearch) => {
	//   dispatch(TournamentWinnerActions.SearchWinners(search));
	//   updateSearch(search);
	// };

	return (
		<React.Fragment>
			<h3 className="text-primary mb-2">
				{tournament.name} History
				{/* <FaSearch size={20} color="primary" className="ml-2 clickable" onClick={() => updateDoSearch(!doSearch)} /> */}
			</h3>
			<LoadingContainer loading={isLoading}>
				{/* {doSearch && (
          <React.Fragment>
            <h5 className="text-secondary">Search</h5>
            <TournamentHistorySearch
              divisionLabel="Group"
              hideLocation={false}
              search={search}
              onSearch={(search) => searchWinners(search)}
            />
          </React.Fragment>
        )} */}
				{permissions.canEditTournamentHistory() && (
					<Button variant="link" className="text-warning" onClick={() => handleEdit()}>
						Add New Champion
					</Button>
				)}
				<Table striped size="sm">
					<thead>
						<tr>
							<th>Year</th>
							<th>Location</th>
							<th>Division/Flight</th>
							<th>Champion</th>
							<th>Score</th>
							<th>Notes</th>
							{permissions.canEditTournamentHistory() ? <th>Edit</th> : null}
						</tr>
					</thead>
					<tbody>
						{groups
							? groups.map((group: ITournamentWinnerGroup, idx: number) => {
									return (
										<TournamentWinnerGroup
											key={idx}
											group={group}
											onEdit={(winner) => handleEdit(winner)}
										/>
									)
							  })
							: null}
					</tbody>
				</Table>
				<TournamentWinnerEditModal show={doEdit} winner={winnerToEdit} onClose={handleClose} />
			</LoadingContainer>
		</React.Fragment>
	)
}

export default TournamentHistoryTable
