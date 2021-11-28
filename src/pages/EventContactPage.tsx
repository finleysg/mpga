import React from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ContactLayout from '../components/layouts/ContactLayout';
import LoadingContainer from '../components/LoadingContainer';
import ContactForm from '../features/contact/ContactForm';
import EventDetailLoader from '../features/events/EventDetailLoader';
import { ContactMessage } from '../models/ContactMessage';
import { IApplicationState } from '../store';

const EventContactPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const events = useSelector((state: IApplicationState) => state.events);

    const doRender = (): boolean => {
        return (
            events.currentEvent?.tournament?.systemName !== undefined &&
            events.currentEvent?.tournament?.systemName === name
        );
    };

    return (
        <ContactLayout>
            <EventDetailLoader />
            <LoadingContainer hasData={doRender()}>
                <h3 className="text-primary">Contact the {events.currentEvent.name} Chairs</h3>
                <p>
                    Messages sent here are routed to the tournament chairs. They will respond as
                    soon possible.
                </p>
                <ContactForm message={new ContactMessage("Tournament", events.currentEvent.name)} />
            </LoadingContainer>
        </ContactLayout>
    );
};

export default EventContactPage;
