import React, { useMemo, useState } from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetDocumentsQuery } from "features/documents/documentApi";
import { IDocumentSearch } from "features/documents/documentPropTypes";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { MpgaDocument } from "../../models/Documents";
import { EventLink } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import DocumentEdit from "../documents/DocumentEdit";
import EventDocumentList from "./EventDocumentList";
import { EventProps } from "./eventsPropType";
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

export function EventInformationLinks(props: EventProps) {
  const { eventDetail } = props;

  const [addDocument, setAddDocument] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const permissions = usePermissions();

  const query = useMemo(() => {
    const queryKey = `${eventDetail.startDate.getFullYear()}-${eventDetail.tournament.systemName}-event-detail`;
    return {
      key: queryKey,
      year: eventDetail.startDate.getFullYear(),
      tournamentId: eventDetail.tournament.id,
    } as IDocumentSearch;
  }, [eventDetail.startDate, eventDetail.tournament]);

  const { data: eventDocuments, isLoading } = useGetDocumentsQuery(query);

  const handleClose = () => {
    setAddDocument(false);
    setAddLink(false);
  };

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
          <EventLinkEdit eventLink={new EventLink({ id: 0, event: eventDetail.id })} onClose={handleClose} />
        </FormContainer>
      )}
      {addDocument && (
        <FormContainer>
          <DocumentEdit
            document={
              new MpgaDocument({
                id: 0,
                year: query.year,
                tournament: query.tournamentId,
              })
            }
            onClose={handleClose}
          />
        </FormContainer>
      )}
      {eventDetail.eventType !== "C" && eventDetail.eventType !== "P" && (
        <LoadingContainer loading={isLoading}>
          <EventRegistration eventDetail={eventDetail} />
          <EventLinkList eventDetail={eventDetail} title="Register Now" linkType="Registration" />
          <EventDocumentList documents={eventDocuments} title="Register by Mail" documentType="Registration" />
          <EventLinkList eventDetail={eventDetail} title="Online Tee Times" linkType="Tee Times" />
          <EventDocumentList documents={eventDocuments} title="Tee Times" documentType="Tee Times" />
          <EventLinkList eventDetail={eventDetail} title="Online Results" linkType="Results" />
          <EventDocumentList documents={eventDocuments} title="Results" documentType="Results" />
          <EventLinkList eventDetail={eventDetail} title="Media" linkType="Media" />
        </LoadingContainer>
      )}
    </React.Fragment>
  );
}
