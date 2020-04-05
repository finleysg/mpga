import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

import constants from "../../constants";
import { ITournamentWinnerGroup, TournamentWinner } from "../../models/Events";
import { IApplicationState } from "../../store";
import TournamentWinnerActions from "../../store/TournamentWinnerActions";
import MatchPlayHistoryEditModal from "./MatchPlayHistoryEditModal";
import MatchPlayHistoryGroup from "./MatchPlayHistoryGroup";
import LoadingContainer from "../../components/LoadingContainer";
import TournamentHistorySearch from "../tournaments/TournamentHistorySearch";
import { FaSearch } from "react-icons/fa";
import { ITournamentHistorySearch } from '../tournaments/TournamentHistorySearch';

const MatchPlayHistoryTable: React.FC = () => {
    const [doEdit, updateDoEdit] = useState(false);
    const [doSearch, updateDoSearch] = useState(false);
    const [search, updateSearch] = useState({});
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);
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
        dispatch(TournamentWinnerActions.AddNew(tournamentState.currentTournament, constants.MatchPlayYear));
        updateDoEdit(true);
    };

    const newlyAddedWinner = (): TournamentWinner => {
        const group = winnerState.groups.filter((g) => g.year === constants.MatchPlayYear)[0];
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
                Match Play History
                <FaSearch size={20} color="teal" className="ml-2 clickable" onClick={() => updateDoSearch(!doSearch)} />
            </h3>
            <LoadingContainer hasData={winnerState.groups !== undefined}>
                {doSearch && (
                    <React.Fragment>
                        <h5 className="text-secondary">Search</h5>
                        <TournamentHistorySearch
                            divisionLabel="Group"
                            hideLocation={true}
                            search={search}
                            OnSearch={(search) => searchWinners(search)}
                        />
                    </React.Fragment>
                )}
                {session.user.isFullEditor && (
                    <Button variant="link" className="text-warning" onClick={() => createNewWinner()}>
                        Add New Result
                    </Button>
                )}
                <Table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Group</th>
                            <th>Champion</th>
                            <th>Runner Up</th>
                            <th>Score</th>
                            <th>Notes</th>
                            {session.user.isFullEditor && <th>Edit</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {winnerState.filteredGroups.map((group: ITournamentWinnerGroup, idx: number) => {
                            return <MatchPlayHistoryGroup key={idx} group={group} />;
                        })}
                    </tbody>
                </Table>
                <MatchPlayHistoryEditModal
                    show={doEdit}
                    winner={newlyAddedWinner()}
                    Save={saveTournament}
                    Cancel={cancelEdit}
                />
            </LoadingContainer>
        </React.Fragment>
    );
};

export default MatchPlayHistoryTable;
