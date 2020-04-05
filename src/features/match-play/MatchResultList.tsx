import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LoadingContainer from "../../components/LoadingContainer";
import MultiSelect from "../../components/MultiSelect";
import { MatchResult } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MatchPlayActions from "../../store/MatchPlayActions";
import MatchResultRow from "./MatchResultRow";
import moment from "moment";

const FilterButton = styled.a`
    margin: 0;
    cursor: pointer;
`;
FilterButton.displayName = "FilterButton";

export function MatchResultList() {
    const dispatch = useDispatch();
    const [viewFilter, setViewFilter] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);
    // const session = useSelector((state: IApplicationState) => state.session);

    React.useEffect(() => {
        dispatch(MatchPlayActions.LoadMatchResults());
    }, [dispatch]);

    const uniqueTeamNames = (): string[] => {
        const teamNames = matchPlayState.teams.map(t => t.club.name);
        const uniqueNames = [...new Set(teamNames)];
        return uniqueNames.sort();
    };

    const filteredMatchResults = (): MatchResult[] => {
        if (
            (selectedGroups === undefined || selectedGroups.length === 0) &&
            (selectedDates === undefined || selectedDates.length === 0) &&
            (selectedTeams === undefined || selectedTeams.length === 0)
        ) {
            return matchPlayState.results;
        }

        let filtered = matchPlayState.results.slice(0);
        if (selectedDates?.length > 0) {
            filtered = filtered.filter(r => selectedDates.indexOf(moment(r.matchDate).format("MMM DD")) !== -1);
        }
        if (selectedGroups?.length > 0) {
            filtered = filtered.filter(r => selectedGroups.indexOf(r.groupName) !== -1);
        }
        if (selectedTeams?.length > 0) {
            filtered = filtered.filter(
                r => selectedTeams.indexOf(r.homeTeamName) !== -1 || selectedTeams.indexOf(r.awayTeamName) !== -1
            );
        }

        return filtered;
    };

    return (
        <LoadingContainer hasData={matchPlayState.results && matchPlayState.results.length > 0}>
            <Table>
                <thead>
                    <tr>
                        <th>
                            {viewFilter && (
                                <MultiSelect
                                    clearText="Clear"
                                    closeText="Apply"
                                    label="Select..."
                                    initialValues={selectedDates}
                                    onChange={selections => setSelectedDates(selections)}>
                                    {matchPlayState.matchDates.map((dt, index) => {
                                        return (
                                            <option key={index} value={dt}>
                                                {dt}
                                            </option>
                                        );
                                    })}
                                </MultiSelect>
                            )}
                            Date
                            <FilterButton onClick={() => setViewFilter(!viewFilter)}>
                                <FaFilter size={18} color={"silver"} />
                            </FilterButton>
                        </th>
                        <th>
                            {viewFilter && (
                                <MultiSelect
                                    clearText="Clear"
                                    closeText="Apply"
                                    label="Select..."
                                    initialValues={selectedGroups}
                                    onChange={selections => setSelectedGroups(selections)}>
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
                        </th>
                        <th>
                            {viewFilter && (
                                <MultiSelect
                                    clearText="Clear"
                                    closeText="Apply"
                                    label="Select..."
                                    initialValues={selectedTeams}
                                    onChange={selections => setSelectedTeams(selections)}>
                                    {uniqueTeamNames().map((team, index) => {
                                        return (
                                            <option key={index} value={team}>
                                                {team}
                                            </option>
                                        );
                                    })}
                                </MultiSelect>
                            )}
                            Home Team
                        </th>
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
        </LoadingContainer>
    );
}
