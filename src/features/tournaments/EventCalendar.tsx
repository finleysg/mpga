import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Loading from '../../components/Loading';
import constants from '../../constants';
import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import EventCalendarItem from './EventCalendarItem';

const EventCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.tournaments);

    let history = useHistory();
    
    useEffect(() => {
        dispatch(TournamentActions.LoadTournaments());  
        dispatch(TournamentActions.LoadEvents());
    }, [dispatch]);

    const handleNavigation = (linkName: string) => {
        const location = {
            pathname: `/tournaments/t/${linkName}`
        }
        history.push(location);
    }

    return (
        <div>
            <h3 className="text-primary mb-3">{constants.EventCalendarYear} Tournament Calendar</h3>
            {state.isBusy ?
            <Loading /> :
            state.events.map(event => {
                return <EventCalendarItem
                    eventId={event.id!}
                    tournamentName={event.name}
                    hostCourseName={event.location!.name}
                    hostCourceImageUrl={event.location?.logoUrl}
                    startDate={event.startDate}
                    rounds={event.rounds}
                    linkName={event.tournament?.systemName}
                    OnSelect={handleNavigation}
                />
            })}            
        </div>
    );
}

export default EventCalendar;