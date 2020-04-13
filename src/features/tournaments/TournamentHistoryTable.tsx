import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import constants from "../../constants";
import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events";
import { IApplicationState } from "../../store";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import usePermissions from "../../utilities/Permissions";
import TournamentHistorySearch, { ITournamentHistorySearch } from "../tournaments/TournamentHistorySearch";
import TournamentWinnerEditModal from "./TournamentWinnerEditModal";
import TournamentWinnerGroup from "./TournamentWinnerGroup";

const TournamentHistoryTable: React.FC = () => {
    const [doEdit, updateDoEdit] = useState(false);
    const [doSearch, updateDoSearch] = useState(false);
    const [search, updateSearch] = useState({});
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const winnerState = useSelector((state: IApplicationState) => state.winners);
    const tournamentState = useSelector((state: IApplicationState) => state.tournament);

    const saveTournament = (winner: TournamentWinner) => {
        dispatch(TournamentWinnerActions.SaveTournamentWinner(tournamentState.currentTournament, winner));
        updateDoEdit(false);
    };

    const cancelEdit = () => {
        dispatch(TournamentWinnerActions.CancelNew());
        updateDoEdit(false);
    };

    const createNewWinner = () => {
        dispatch(TournamentWinnerActions.AddNew(tournamentState.currentTournament, constants.EventCalendarYear));
        updateDoEdit(true);
    };

    const newlyAddedWinner = (): TournamentWinner => {
        const group = winnerState.groups.filter((g) => g.year === constants.EventCalendarYear)[0];
        if (group) {
            const winner = group.winners.find((w) => w.id === 0) || new TournamentWinner({ id: 0 });
            return winner;
        }
        return new TournamentWinner({ id: 0 });
    };

    const searchWinners = (search: ITournamentHistorySearch) => {
        dispatch(TournamentWinnerActions.SearchWinners(search));
        updateSearch(search);
    };

    return (
        <React.Fragment>
            <h3 className="text-primary mb-2">
                {tournamentState.currentTournament.name} History
                <FaSearch size={20} color="teal" className="ml-2 clickable" onClick={() => updateDoSearch(!doSearch)} />
            </h3>
            <LoadingContainer hasData={winnerState.groups !== undefined}>
                {doSearch && (
                    <React.Fragment>
                        <h5 className="text-secondary">Search</h5>
                        <TournamentHistorySearch
                            divisionLabel="Group"
                            hideLocation={false}
                            search={search}
                            OnSearch={(search) => searchWinners(search)}
                        />
                    </React.Fragment>
                )}
                {permissions.canEditTournamentHistory() && (
                    <Button variant="link" className="text-warning" onClick={() => createNewWinner()}>
                        Add New Champion
                    </Button>
                )}
                <Table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Location</th>
                            <th>Division/Flight</th>
                            <th>Champion</th>
                            <th>Score</th>
                            <th>Notes</th>
                            {permissions.canEditTournamentHistory() && <th>Edit</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {winnerState.filteredGroups.map((group: ITournamentWinnerGroup, idx: number) => {
                            return <TournamentWinnerGroup key={idx} group={group} />;
                        })}
                    </tbody>
                </Table>
                <TournamentWinnerEditModal
                    show={doEdit}
                    winner={newlyAddedWinner()}
                    Save={saveTournament}
                    Cancel={cancelEdit}
                />
            </LoadingContainer>
        </React.Fragment>
    );
};

export default TournamentHistoryTable;
