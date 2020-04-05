import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Team } from "../../models/Clubs";
import TeamCaptains from './TeamCaptains';

export interface ITeamRowProps {
    team: Team;
}

const TeamRow: React.FC<ITeamRowProps> = props => {
    const { team } = props;
    const [showCaptain, updateShowCaptain] = useState(false);

    return (
        <React.Fragment>
            <tr>
                <td>{team.isSenior ? "Sr." : ""}</td>
                <td>{team.groupName}</td>
                <td>{team.club?.name}</td>
                <td>
                    <Button variant="link" className="text-primary" onClick={() => updateShowCaptain(!showCaptain)}>
                        {team.captainNames(team.isSenior!)}
                    </Button>
                </td>
            </tr>
            {team.captains(team.isSenior!) && showCaptain && (
                <tr>
                    <td colSpan={4}>
                        <TeamCaptains captains={team.captains(team.isSenior!)} />
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default TeamRow;
