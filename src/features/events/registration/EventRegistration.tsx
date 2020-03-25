import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../../components/Loading';
import { IApplicationState } from '../../../store';
import { IDocumentSearch } from '../../../store/DocumentActions';
import DocumentList from '../../documents/DocumentList';
import { DocumentViewType, IDocumentRenderProps } from '../../documents/DocumentView';
import EventLinkList from '../links/EventLinkList';
import { ILinkRenderProps, LinkViewType } from '../links/EventLinkView';
import EventRegistrationDatesDetail from './EventRegistrationDatesDetail';

export interface IEventRegistrationProps {
    query: IDocumentSearch;
}

const EventRegistration: React.FC<IEventRegistrationProps> = props => {
    const eventState = useSelector((state: IApplicationState) => state.events);
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const registrationDocuments = () => {
        return documentState.documents.get(props.query.key)?.filter(d => d.documentType === "Registration");
    };
    const documentRender: IDocumentRenderProps = {
        viewType: DocumentViewType.Button,
        variant: "outline-secondary",
        external: true,
    };
    const linkRender: ILinkRenderProps = {
        viewType: LinkViewType.Button,
        variant: "outline-secondary",
        external: true,
    };

    return (
        <div>
            {!eventState.currentEvent ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h3 className="text-primary">Registration</h3>
                    <EventRegistrationDatesDetail />
                    <h5 className="mt-1">Register Now</h5>
                    <EventLinkList linkType="Registration" render={linkRender} />
                    <h5 className="mt-1">Register by Mail</h5>
                    <DocumentList
                        query={props.query}
                        documents={registrationDocuments() || []}
                        render={documentRender}
                    />
                </React.Fragment>
            )}
        </div>
    );
};

export default EventRegistration;
