import React, { useState } from 'react';

import Table from 'react-bootstrap/Table';
import { FaFilter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LoadingContainer from '../../components/LoadingContainer';
import MultiSelect from '../../components/MultiSelect';
import { Team } from '../../models/Clubs';
import { IApplicationState } from '../../store';
import MatchPlayActions from '../../store/MatchPlayActions';
import TeamRow from './TeamRow';

const FilterButton = styled.a`
    margin: 0;
    cursor: pointer;
`;
FilterButton.displayName = "FilterButton";

const GroupColumn = styled.th`
    min-width: 120px;
    max-width: 150px;
`;
GroupColumn.displayName = "GroupColumn";

export function TeamList() {
    const dispatch = useDispatch();
    const [viewFilter, setViewFilter] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);
    // const session = useSelector((state: IApplicationState) => state.session);

    React.useEffect(() => {
        dispatch(MatchPlayActions.LoadTeams());
    }, [dispatch]);

    const filteredTeams = () => {
        if (selectedGroups === undefined || selectedGroups.length === 0) {
            return matchPlayState.teams;
        }
        return matchPlayState.teams.filter((t) => selectedGroups.indexOf(t.groupName) !== -1);
    };

    return (
        <LoadingContainer hasData={matchPlayState.teams && matchPlayState.teams.length > 0}>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>
                            <FilterButton
                                className="text-secondary"
                                onClick={() => setViewFilter(!viewFilter)}>
                                <FaFilter size={18} color={"secondary"} />
                            </FilterButton>
                        </th>
                        <GroupColumn>
                            {viewFilter && (
                                <MultiSelect
                                    clearText="Clear"
                                    closeText="Apply"
                                    label="Select..."
                                    initialValues={selectedGroups}
                                    onChange={(selections) => setSelectedGroups(selections)}>
                                    {matchPlayState.groups.map((group, index) => {
                                        return (
                                            <option key={index} value={group}>
                                                {group}
                                            </option>
                                        );
                                    })}
                                </MultiSelect>
                            )}
                            Group
                        </GroupColumn>
                        <th>Club</th>
                        <th>Captain(s)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTeams().map((team: Team) => (
                        <TeamRow key={team.id} team={team} />
                    ))}
                </tbody>
            </Table>
        </LoadingContainer>
    );
}
