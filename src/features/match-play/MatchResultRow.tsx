import moment from "moment";
import React, { useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import styled from "styled-components";

import { MatchResult } from "../../models/Clubs";
import { Notes } from "../awards/AwardWinnerView";

interface ITeamCellProps {
    teamName: string;
    winner: string;
}
const TeamCell = styled.td<ITeamCellProps>`
    ${props =>
        props.teamName === props.winner &&
        `
        font-weight: bold;
        color: #28a745;
    `}
`;
TeamCell.displayName = "TeamCell";

export interface IMatchResultRowProps {
    result: MatchResult;
}

const MatchResultRow: React.FC<IMatchResultRowProps> = props => {
    const { result } = props;
    const [showNotes, setShowNotes] = useState(false);

    return (
        <React.Fragment>
            <tr>
                <td>{moment(result.matchDate).format("MMM DD")}</td>
                <td>{result.groupName}</td>
                <TeamCell teamName={result.homeTeamName} winner={result.winner}>
                    {result.homeTeamName}
                </TeamCell>
                <td>{result.homeTeamScore}</td>
                <TeamCell teamName={result.awayTeamName} winner={result.winner}>
                    {result.awayTeamName}
                </TeamCell>
                <td>{result.awayTeamScore}</td>
                <td className="clickable text-secondary" onClick={() => setShowNotes(!showNotes)}>
                    {result.notes && <TiDocumentText size={18} color={"primary"} />}
                </td>
            </tr>
            {result.notes && showNotes && (
                <tr>
                    <td colSpan={7}><Notes>{result.notes}</Notes></td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default MatchResultRow;
