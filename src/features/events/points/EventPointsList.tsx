import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EventDetail, EventPoints } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import EventActions from "../../../store/EventActions";
import EventPointsDetail from "./EventPointsDetail";
import Button from "react-bootstrap/Button";

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventPointsList: React.FunctionComponent<IEventDetailProps> = props => {
    const { eventDetail } = props;
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();
    const canAdd = eventDetail.policies?.findIndex(p => p.id === 0) || -1 < 0; // no pending add

    const deleteEventPoints = useCallback(
        (eventPoints: EventPoints) => dispatch(EventActions.DeleteEventPoints(eventPoints)),
        [dispatch]
    );

    const saveEventPoints = useCallback(
        (eventPoints: EventPoints) => dispatch(EventActions.SaveEventPoints(eventPoints)),
        [dispatch]
    );

    return (
        <React.Fragment>
            <h5 className="text-primary">Player Points</h5>
            {eventDetail.playerPoints?.map(p => {
                return (
                    <EventPointsDetail
                        key={p.id}
                        edit={p.id === 0}
                        points={p}
                        Save={saveEventPoints}
                        Delete={deleteEventPoints}
                        Cancel={() => dispatch(EventActions.CancelNewEventPoints())}
                    />
                );
            })}
            {session.user.isFullEditor && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(EventActions.AddNewEventPoints())}>
                    New Player Points
                </Button>
            )}
        </React.Fragment>
    );
};

export default EventPointsList;
