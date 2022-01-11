import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import { TeamProps } from "./matchPlayPropTypes";
import TeamCaptains from "./TeamCaptains";

const TeamRow: React.FC<TeamProps> = (props) => {
  const { team } = props;
  const [showCaptain, updateShowCaptain] = useState(false);

  return (
    <React.Fragment>
      <tr>
        <td>{team.isSenior ? "Sr." : ""}</td>
        <td>{team.groupName}</td>
        <td>{team.club?.name}</td>
        <td>
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
