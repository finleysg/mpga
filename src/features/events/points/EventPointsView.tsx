import React from "react";

import { EventPoints } from "../../../models/Events";

export interface IEventPointsViewProps {
    points: EventPoints;
}

const EventPointsView: React.FC<IEventPointsViewProps> = props => {
    const { points } = props;
    return (
        <p className="mb-1">
            {points.ordinalPlace} - <strong>{points.points} pts</strong>
        </p>
    );
};

export default EventPointsView;
