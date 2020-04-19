import * as React from "react";
import { EventDetail } from "../../../models/Events";
import ReactMarkdown from "react-markdown";

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventFormatView: React.FunctionComponent<IEventDetailProps> = props => {
    const { eventDetail } = props;
    return (
        <React.Fragment>
            <h5 className="text-primary">Format</h5>
            <ReactMarkdown source={eventDetail.description} escapeHtml={true} />
        </React.Fragment>
    );
};

export default EventFormatView;
