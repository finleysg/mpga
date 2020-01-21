import React from 'react';
import Table from 'react-bootstrap/Table';
import { TournamentWinner, ITournamentWinnerGroup } from '../../models/Events';
import TournamentHistoryRow from './TournamentHistoryRow';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../store';

export interface ITournamentHistoryTableProps {
    group: ITournamentWinnerGroup;
}

const TournamentHistoryTable: React.FC<ITournamentHistoryTableProps> = (props) => {
    const { year, location, winners } = props.group;
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <div>
            <h4>{year} {location}</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Flight/Division</th>
                        <th>Winner(s)</th>
                        <th>Score</th>
                        <th>Notes</th>
                        {session.user.isFullEditor && <th>Edit</th>}
                    </tr>
                </thead>
                <tbody>
                    {winners.map((winner: TournamentWinner) => <TournamentHistoryRow key={winner.id} winner={winner} />)}
                </tbody>
            </Table>
        </div>
    );
}

export default TournamentHistoryTable;
