import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { TeamProps } from "./matchPlayPropTypes";
import TeamCaptains from "./TeamCaptains";

// TODO: move styling here
const TableCell = styled.td``;

const TeamRow: React.FC<TeamProps> = (props) => {
  const { team } = props;
  const [showCaptain, updateShowCaptain] = useState(false);

  return (
    <React.Fragment>
      <tr>
        <td style={{ borderTop: props.addSpace ? "4px solid #bcc0c4" : "1px solid #dee2e6" }}>
          {team.isSenior ? "Sr." : ""}
        </td>
        <td style={{ borderTop: props.addSpace ? "4px solid #bcc0c4" : "1px solid #dee2e6" }}>{team.groupName}</td>
        <td style={{ borderTop: props.addSpace ? "4px solid #bcc0c4" : "1px solid #dee2e6" }}>{team.club?.name}</td>
        <td style={{ borderTop: props.addSpace ? "4px solid #bcc0c4" : "1px solid #dee2e6" }}>
          <Button variant="link" className="text-info pb-0 pt-0" onClick={() => updateShowCaptain(!showCaptain)}>
            {team.captainNames(team.isSenior!)}
          </Button>
        </td>
      </tr>
      {team.captains(team.isSenior!) && showCaptain && (
        <tr>
          <td colSpan={3}></td>
          <td>
            <TeamCaptains captains={team.captains(team.isSenior!)} />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default TeamRow;
