import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import constants from '../../constants';
import { IApplicationState } from '../../store';
import TournamentActions from '../../store/TournamentActions';
import TournamentCalendarItem from './TournamentCalendarItem';

const TournamentCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.tournaments);

    useEffect(() => {
        dispatch(TournamentActions.Load());  
    }, [dispatch]);

    const handleNavigation = (eventId: number) => {
        console.log(eventId);
    }

    return (
        <div>
            <h3 className="text-primary mb-3">{constants.EventCalendarYear} Tournament Calendar</h3>
            {state.isBusy ?
            <Loading /> :
            state.data.map(event => {
                return <TournamentCalendarItem
                    eventId={event.id!}
                    tournamentName={event.name}
                    hostCourseName={event.location!.name}
                    hostCourceImageUrl={event.location?.logoUrl}
                    startDate={event.startDate}
                    rounds={event.rounds}
                    OnSelect={handleNavigation}
                />
            })}            
        </div>
    );
}

export default TournamentCalendar;
