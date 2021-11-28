import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LoadingContainer from '../../components/LoadingContainer';
import Constants from '../../constants';
import { MatchResult } from '../../models/Clubs';
import { IApplicationState } from '../../store';
import MatchPlayActions from '../../store/MatchPlayActions';
import MatchResultRow from './MatchResultRow';

const FilterButton = styled.a`
    margin: 0;
    cursor: pointer;
`;
FilterButton.displayName = "FilterButton";

const DateColumn = styled.th`
    min-width: 120px;
    max-width: 120px;
`;
DateColumn.displayName = "DateColumn";

const GroupColumn = styled.th`
    min-width: 150px;
    max-width: 150px;
`;
GroupColumn.displayName = "GroupColumn";

const TeamColumn = styled.th`
    min-width: 180px;
    max-width: 180px;
`;
TeamColumn.displayName = "TeamColumn";

export function MatchResultList() {
    const dispatch = useDispatch();
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);

    React.useEffect(() => {
        dispatch(MatchPlayActions.LoadMatchResults());
    }, [dispatch]);

    const filteredMatchResults = (): MatchResult[] => {
        if (!selectedGroup) {
            return matchPlayState.results;
        }

        const filtered = matchPlayState.results.slice(0);
        return filtered.filter((result) => result.groupName === selectedGroup);
    };

    return (
        <React.Fragment>
            <h3 className="text-primary">
                {Constants.MatchPlayYear} Match Results
                <select
                    className="form-control form-control-sm"
                    onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="">Show All</option>
                    {matchPlayState.groups.map((group, index) => {
                        return (
                            <option key={index} value={group}>
                                {group}
                            </option>
                        );
                    })}
                </select>
            </h3>
            <LoadingContainer
                hasData={matchPlayState.results && matchPlayState.results.length >= 0}>
                {matchPlayState.results.length === 0 && <p>No results reported yet.</p>}
                {matchPlayState.results.length > 0 && (
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <DateColumn>Date</DateColumn>
                                <GroupColumn>Group</GroupColumn>
                                <TeamColumn>Home Team</TeamColumn>
                                <th>Score</th>
                                <th>Away Team</th>
                                <th>Score</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatchResults().map((result: MatchResult) => (
                                <MatchResultRow key={result.id} result={result} />
                            ))}
                        </tbody>
                    </Table>
                )}
            </LoadingContainer>
        </React.Fragment>
    );
}
