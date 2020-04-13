import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

import { EventDetail, EventPolicy } from '../../../models/Events';
import EventActions from '../../../store/EventActions';
import EventPolicyDetail from './EventPolicyDetail';
import usePermissions from "../../../utilities/Permissions";

export interface IEventPolicyListProps {
    eventDetail: EventDetail;
}

const EventPolicyList: React.FunctionComponent<IEventPolicyListProps> = (props) => {
    const { eventDetail } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const canAdd = eventDetail.policies?.findIndex(p => p.id === 0) || -1 < 0; // no pending add

    const removeEventPolicy = useCallback(
        (eventPolicy: EventPolicy) => dispatch(EventActions.RemoveEventPolicy(eventPolicy)),
        [dispatch]
    );

    const saveEventPolicy = useCallback(
        (eventPolicy: EventPolicy) => dispatch(EventActions.SaveEventPolicy(eventPolicy)),
        [dispatch]
    );

    return (
        <React.Fragment>
            {eventDetail.policies?.map(policy => {
                return (
                    <EventPolicyDetail
                        key={policy.id}
                        edit={policy.id === 0}
                        policy={policy}
                        Save={saveEventPolicy}
                        Remove={removeEventPolicy}
                        Cancel={() => dispatch(EventActions.CancelNewEventPolicy())}
                    />
                );
            })}
            {permissions.canManageEvent() && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(EventActions.AddNewEventPolicy())}>
                    New Tournament Policy
                </Button>
            )}
        </React.Fragment>
    );
};

export default EventPolicyList;
