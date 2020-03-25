import React from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ThreeColumnsLargeCenter from "../components/layouts/ThreeColumnsLargeCenter";
import Loading from "../components/Loading";
import DocumentLoader from "../features/documents/DocumentLoader";
import EventDetailLoader from "../features/events/EventDetailLoader";
import EventDetailView from "../features/events/EventDetailView";
import EventResults from "../features/events/EventResults";
import EventTeeTimes from "../features/events/EventTeeTimes";
import EventRegistration from "../features/events/registration/EventRegistration";
import { IApplicationState } from "../store";
import { IDocumentSearch } from "../store/DocumentActions";
import EventWinnerList from "../features/events/winners/EventWinnerList";
import EventGalleryDetail from "../features/events/photos/EventGalleryDetail";

const EventDetailPage: React.FC = () => {
    const { name, year } = useParams();
    const events = useSelector((state: IApplicationState) => state.events);
    const queryKey = `${year}-${name}-event-detail`;
    const query: IDocumentSearch = {
        key: queryKey,
        event: events.currentEvent,
    };
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
                    <DocumentLoader query={query} />
                    <ThreeColumnsLargeCenter
                        Column1={
                            <React.Fragment>
                                <EventRegistration query={{ ...query, documentTypes: ["Registration"] }} />
                                <EventTeeTimes query={{ ...query, documentTypes: ["Tee Times"] }} />
                                <EventResults query={{ ...query, documentTypes: ["Results"] }} />
                            </React.Fragment>
                        }
                        Column2={<EventDetailView />}
                        Column3={
                            <React.Fragment>
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
