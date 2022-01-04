import React from "react";

import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LoadingContainer from "../../components/LoadingContainer";
import { Team } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MatchPlayActions from "../../store/MatchPlayActions";
import TeamRow from "./TeamRow";

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
  const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);

  React.useEffect(() => {
    dispatch(MatchPlayActions.LoadTeams());
  }, [dispatch]);

  return (
    <LoadingContainer loading={!matchPlayState.teams}>
      <Table striped size="sm">
        <thead>
          <tr>
            <th></th>
            <GroupColumn>Group</GroupColumn>
            <th>Club</th>
            <th>Captain(s)</th>
          </tr>
        </thead>
        <tbody>
          {matchPlayState.teams.map((team: Team) => (
            <TeamRow key={team.id} team={team} />
          ))}
        </tbody>
      </Table>
    </LoadingContainer>
  );
}
