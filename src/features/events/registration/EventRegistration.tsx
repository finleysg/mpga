import React from "react";

import EventRegistrationDatesDetail from "./EventRegistrationDatesDetail";

const EventRegistration: React.FC = () => {

    return (
        <div>
            <h3 className="text-primary">Registration</h3>
            <EventRegistrationDatesDetail />
        </div>
    );
};

export default EventRegistration;
