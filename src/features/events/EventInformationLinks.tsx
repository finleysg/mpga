import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { MpgaDocument } from "../../models/Documents";
import { EventLink } from "../../models/Events";
import { IApplicationState } from "../../store";
import DocumentActions, { IDocumentSearch } from "../../store/DocumentActions";
import EventActions from "../../store/EventActions";
import usePermissions from "../../utilities/Permissions";
import DocumentEdit from "../documents/DocumentEdit";
import EventDocumentList from "./EventDocumentList";
import EventLinkEdit from "./links/EventLinkEdit";
import EventLinkList from "./links/EventLinkList";
import EventRegistration from "./registration/EventRegistration";

export const FormContainer = styled.div`
    border-width: 1px;
    border-color: silver;
    border-style: solid;
    padding: 10px;
    margin-bottom: 10px;
`;
FormContainer.displayName = "FormContainer";

export interface IEventInformationLinksProps {
    name: string;
    year: number;
}

export function EventInformationLinks(props: IEventInformationLinksProps) {
    const [addDocument, setAddDocument] = useState(false);
    const [addLink, setAddLink] = useState(false);
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const eventState = useSelector((eventState: IApplicationState) => eventState.events);
    const queryKey = `${props.year}-${props.name}-event-detail`;
    const query: IDocumentSearch = {
        key: queryKey,
        event: eventState.currentEvent,
    };

    useEffect(() => {
        dispatch(DocumentActions.Load(query));
        // eslint-disable-next-line
    }, []);

    const saveEventLink = useCallback(
        (eventLink: EventLink) => {
            dispatch(EventActions.SaveEventLink(eventLink));
            setAddLink(false);
        },
        [dispatch]
    );

    const deleteEventLink = useCallback(
        (eventLink: EventLink) => {
            dispatch(EventActions.DeleteEventLink(eventLink));
            setAddLink(false);
        },
        [dispatch]
    );

    const saveDocument = useCallback(
        (document: MpgaDocument, file?: File) => {
            dispatch(DocumentActions.Save(queryKey, document, file));
            setAddDocument(false);
        },
        [dispatch, queryKey]
    );

    const deleteDocument = useCallback(
        (document: MpgaDocument) => {
            dispatch(DocumentActions.Delete(queryKey, document));
            setAddDocument(false);
        },
        [dispatch, queryKey]
    );

    return (
        <React.Fragment>
            {permissions.canManageEvent() && (
                <div>
                    <Button variant="link" className="text-warning" onClick={() => setAddDocument(true)}>
                        Add an Event Document
                    </Button>
                    <Button variant="link" className="text-warning" onClick={() => setAddLink(true)}>
                        Add an Event Link
                    </Button>
                </div>
            )}
            {addLink && (
                <FormContainer>
                    <EventLinkEdit
                        eventLink={new EventLink({ id: 0, event: eventState.currentEvent.id })}
                        Cancel={() => setAddLink(false)}
                        Delete={deleteEventLink}
                        Save={saveEventLink}
                    />
                </FormContainer>
            )}
            {addDocument && (
                <FormContainer>
                    <DocumentEdit
                        document={
                            new MpgaDocument({
                                id: 0,
                                year: props.year,
                                tournament: eventState.currentEvent.tournament?.id,
                            })
                        }
                        Cancel={() => setAddDocument(false)}
                        Save={saveDocument}
                        Delete={deleteDocument}
                    />
                </FormContainer>
            )}
            <React.Fragment>
                <EventRegistration />
                <EventLinkList title="Register Now" linkType="Registration" />
                <EventDocumentList queryKey={queryKey} title="Register by Mail" documentType="Registration" />
                <EventLinkList title="Online Tee Times" linkType="Tee Times" />
                <EventDocumentList queryKey={queryKey} title="Tee Times" documentType="Tee Times" />
                <EventLinkList title="Online Results" linkType="Results" />
                <EventDocumentList queryKey={queryKey} title="Results" documentType="Results" />
                <EventLinkList title="Media" linkType="Media" />
            </React.Fragment>
        </React.Fragment>
    );
}
