import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import { IDocumentSearch } from '../../store/DocumentActions';
import DocumentList from '../documents/DocumentList';
import { DocumentViewType, IDocumentRenderProps } from '../documents/DocumentView';
import EventLinkList from './links/EventLinkList';
import { ILinkRenderProps, LinkViewType } from './links/EventLinkView';

export interface IEventResultsProps {
    query: IDocumentSearch;
}

const EventResults: React.FC<IEventResultsProps> = props => {
    const eventState = useSelector((state: IApplicationState) => state.events);
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const resultDocuments = () => {
        return documentState.documents.get(props.query.key)?.filter(d => d.documentType === "Results");
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
                    <h3 className="text-primary">Results</h3>
                    <EventLinkList linkType="Results" render={linkRender} />
                    <DocumentList
                        query={props.query}
                        documents={resultDocuments() || []}
                        render={documentRender}
                    />
                </React.Fragment>
            )}
        </div>
    );
};

export default EventResults;
