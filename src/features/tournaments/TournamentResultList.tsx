import React from "react";
import { useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { IApplicationState } from "../../store";
import DocumentList from "../documents/DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "../documents/DocumentView";

const TournamentResultList: React.FC = () => {
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const tournamentState = useSelector((state: IApplicationState) => state.tournament);
    const queryKey = `${tournamentState.currentTournament.systemName}-results`;
    const documentRender: IDocumentRenderProps = {
        viewType: DocumentViewType.Link,
        variant: "info",
        external: true,
    };

    return (
        <React.Fragment>
            <h3 className="text-primary mb-2">Complete Tournament Results</h3>
            <LoadingContainer hasData={documentState.documents.get(queryKey)?.length !== undefined}>
                <DocumentList
                    query={{
                        key: queryKey,
                        documentTypes: ["Results"],
                        tournamentId: tournamentState.currentTournament.id,
                    }}
                    documents={documentState.documents.get(queryKey)!}
                    render={documentRender}
                />
            </LoadingContainer>
        </React.Fragment>
    );
};

export default TournamentResultList;
