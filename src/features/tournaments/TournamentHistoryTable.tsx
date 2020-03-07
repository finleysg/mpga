import React from 'react';
import Table from 'react-bootstrap/Table';
import { TournamentWinner, ITournamentWinnerGroup } from '../../models/Events';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../store';
import TournamentWinnerRow from './TournamentWinnerRow';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import TournamentWinnerActions from '../../store/TournamentWinnerActions';

// TODO: set color to primary
const TournamentYearAndName = styled.span`
    font-size: 1.2em;
    padding: 8px 8px 12px 16px;
    font-weight: bold;
`;
TournamentYearAndName.displayName = "TournamentYearAndName";

export interface ITournamentHistoryTableProps {
    group: ITournamentWinnerGroup;
}

const TournamentHistoryTable: React.FC<ITournamentHistoryTableProps> = (props) => {
    const { year, location, winners } = props.group;
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <div>
            {/* <div>
                <TournamentYearAndName>{year} {location}</TournamentYearAndName>
            </div> */}
            <h4 className="text-secondary mb-3">{year} {location}</h4>
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
                    {winners.map((winner: TournamentWinner) => <TournamentWinnerRow key={winner.id} winner={winner} />)}
                </tbody>
            </Table>
            {session.user.isFullEditor && <Button variant="outline-secondary" 
                size="sm"
                onClick={() => dispatch(TournamentWinnerActions.AddNew(year, location))}>
                Add Winner
            </Button>}
        </div>
    );
}

export default TournamentHistoryTable;
