import React from "react";

import { EventPointsProps } from "../eventsPropType";

const EventPointsView: React.FC<EventPointsProps> = (props) => {
  const { points } = props;
  return (
    <p className="mb-1">
      {points.ordinalPlace} - <strong>{points.points} pts</strong>
    </p>
  );
};

export default EventPointsView;
