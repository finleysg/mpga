import * as React from 'react';

import ReactMarkdown from 'react-markdown';

import { EventDetail } from '../../../models/Events';

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventFormatView: React.FunctionComponent<IEventDetailProps> = (props) => {
    const { eventDetail } = props;
    return (
        <React.Fragment>
            <h5 className="text-primary">Format</h5>
            <ReactMarkdown children={eventDetail.description} />
        </React.Fragment>
    );
};

export default EventFormatView;
