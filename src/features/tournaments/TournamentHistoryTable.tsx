import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TournamentWinner, ITournamentWinnerGroup } from '../../models/Events';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../store';
import TournamentWinnerRow from './TournamentWinnerRow';
import ToggleOpenButton from '../../components/ToggleOpenButton';
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
    const [isOpen, setIsOpen] = useState(false);
    const session = useSelector((state: IApplicationState) => state.session);

    return (
        <div>
            <div>
                <ToggleOpenButton isOpen={isOpen} Toggled={() => setIsOpen(!isOpen)} />
                <TournamentYearAndName>{year} {location}</TournamentYearAndName>
            </div>
            {isOpen &&
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
            </Table>}
            {isOpen && session.user.isFullEditor && <Button variant="outline-secondary" 
                size="sm"
                onClick={() => dispatch(TournamentWinnerActions.AddNew(year, location))}>
                Add Result
            </Button>}
        </div>
    );
}

export default TournamentHistoryTable;
