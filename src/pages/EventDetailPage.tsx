import React from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
import EventDetailLoader from "../features/events/EventDetailLoader";
import EventDetailView from "../features/events/EventDetailView";
import { IApplicationState } from "../store";
import EventWinnerList from "../features/events/winners/EventWinnerList";
import EventGalleryDetail from "../features/events/photos/EventGalleryDetail";
import { EventInformationLinks } from "../features/events/EventInformationLinks";
import NineThree from "../components/layouts/NineThree";

const EventDetailPage: React.FC = () => {
    const { name, year } = useParams();
    const events = useSelector((state: IApplicationState) => state.events);

    const doRender = (): boolean => {
        return (
            events.currentEvent?.tournament?.systemName !== undefined &&
            events.currentEvent?.tournament?.systemName === name
        );
    };

    return (
        <Container fluid={true}>
            <EventDetailLoader />
            {!doRender() && <Loading />}
            {doRender() && (
                <React.Fragment>
                    <NineThree
                        LeftColumn={<EventDetailView />}
                        RightColumn={
                            <React.Fragment>
                                <EventInformationLinks name={name!} year={+year!} />
                                <EventWinnerList eventDetail={events.currentEvent} />
                                <EventGalleryDetail eventDetail={events.currentEvent} />
                            </React.Fragment>
                        }
                    />
                </React.Fragment>
            )}
        </Container>
    );
};

export default EventDetailPage;
