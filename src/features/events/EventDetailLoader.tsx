import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import EventActions from '../../store/EventActions';

const EventDetailLoader: React.FC = () => {
    let { name, year } = useParams<{ name: string; year: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (name && year) {
            dispatch(EventActions.LoadEvent(name, +year));
        }
    }, [dispatch, name, year]);

    return <></>;
};

export default EventDetailLoader;
