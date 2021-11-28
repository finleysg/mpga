import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import constants from '../../constants';
import { IApplicationState } from '../../store';
import DocumentActions, { IDocumentSearch } from '../../store/DocumentActions';
import DocumentList from '../documents/DocumentList';
import {
    DocumentViewType,
    IDocumentRenderProps,
} from '../documents/DocumentView';

const MatchPlayDocuments: React.FC = () => {
    const dispatch = useDispatch();
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const queryKey = "match-play";
    const query: IDocumentSearch = {
        key: queryKey,
        documentTypes: ["Match Play", "Match Play Brackets"],
        year: constants.MatchPlayYear,
    };
    const documents = () => {
        return documentState.documents
            .get(queryKey)
            ?.filter((d) => query.documentTypes!.indexOf(d.documentType) >= 0);
    };
    const documentRender: IDocumentRenderProps = {
        viewType: DocumentViewType.Button,
        variant: "outline-secondary",
        external: true,
    };

    useEffect(() => {
        dispatch(DocumentActions.Load(query));
        // eslint-disable-next-line
    }, []);

    return <DocumentList query={query} documents={documents() || []} render={documentRender} />;
};

export default MatchPlayDocuments;
