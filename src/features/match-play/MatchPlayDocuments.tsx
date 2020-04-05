import React from "react";
import { useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { IApplicationState } from "../../store";
import { IDocumentSearch } from "../../store/DocumentActions";
import DocumentList from "../documents/DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "../documents/DocumentView";

export interface IMatchPlayDocumentsProps {
    query: IDocumentSearch;
}

const MatchPlayDocuments: React.FC<IMatchPlayDocumentsProps> = props => {
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const documents = () => {
        return documentState.documents
            .get(props.query.key)
            ?.filter(d => props.query.documentTypes!.indexOf(d.documentType) >= 0);
    };
    const documentRender: IDocumentRenderProps = {
        viewType: DocumentViewType.Button,
        variant: "outline-secondary",
        external: true,
    };

    return (
        <LoadingContainer hasData={documents() !== undefined && documents()!.length > 0}>
            <DocumentList query={props.query} documents={documents() || []} render={documentRender} />
        </LoadingContainer>
    );
};

export default MatchPlayDocuments;
