import * as React from "react";
import { EventDetail } from "../../../models/Events";
import MarkdownDiv from "../../../components/MarkdownDiv";

interface IEventDetailProps {
    eventDetail: EventDetail;
}

const EventFormatView: React.FunctionComponent<IEventDetailProps> = props => {
    const { eventDetail } = props;
    return (
        <React.Fragment>
            <h5 className="text-primary">Format</h5>
            <MarkdownDiv text={eventDetail.description} />
        </React.Fragment>
    );
};

export default EventFormatView;
