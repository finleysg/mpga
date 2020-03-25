import * as React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import EventChairList from './EventChairList';
import EventFormatDetail from './format/EventFormatDetail';
import EventLocationView from './EventLocationView';
import EventPointsList from './points/EventPointsList';
import EventPolicyList from './policies/EventPolicyList';

const EventDetailView: React.FunctionComponent = () => {
    const state = useSelector((state: IApplicationState) => state.events);

    return (
        <div>
            {state.isBusy ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h1 className="text-secondary">{state.currentEvent.name}</h1>
                    <EventLocationView eventDetail={state.currentEvent} />
                    <EventFormatDetail eventDetail={state.currentEvent} />
                    <EventPolicyList eventDetail={state.currentEvent} />
                    <EventPointsList eventDetail={state.currentEvent} />
                    <EventChairList eventDetail={state.currentEvent} />
                </React.Fragment>
            )}
        </div>
    );
};

export default EventDetailView;
