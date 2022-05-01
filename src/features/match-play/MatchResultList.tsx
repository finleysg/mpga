import React, { useState } from "react";

import Table from "react-bootstrap/Table";
import styled from "styled-components";

import Constants from "../../app-constants";
import LoadingContainer from "../../components/LoadingContainer";
import { MatchResult } from "../../models/Clubs";
import { useGetMatchResultsQuery } from "./matchPlayApi";
import MatchResultRow from "./MatchResultRow";

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
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const { results, isLoading } = useGetMatchResultsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      results: data?.map((d) => new MatchResult(d)) || [],
      isLoading,
    }),
  });
  const groups = new Set(results?.map((t) => t.groupName) || []);

  const filteredMatchResults = (): MatchResult[] => {
    if (!selectedGroup) {
      return results;
    }
    const filtered = results.slice(0);
    return filtered.filter((result) => result.groupName === selectedGroup);
  };

  return (
    <LoadingContainer loading={isLoading}>
      <h3 className="text-primary">
        {Constants.MatchPlayYear} Match Results
        <select className="form-control form-control-sm" onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="">Show All</option>
          {[...groups]?.map((group, index) => {
            return (
              <option key={index} value={group.toString()}>
                {group}
              </option>
            );
          })}
        </select>
      </h3>
      {results?.length === 0 && <p>No results reported yet.</p>}
      {results?.length > 0 && (
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
  );
}
