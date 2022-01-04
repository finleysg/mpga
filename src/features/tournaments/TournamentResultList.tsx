import React from "react";

import { useAppSelector } from "app-store";

import DocumentList from "../documents/DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "../documents/DocumentView";

const TournamentResultList: React.FC = () => {
  const documentState = useAppSelector((state) => state.documents);
  const tournamentState = useAppSelector((state) => state.tournament);
  const queryKey = `${tournamentState.currentTournament.systemName}-results`;
  const documentRender: IDocumentRenderProps = {
    viewType: DocumentViewType.Link,
    variant: "info",
    external: true,
  };

  return (
    <React.Fragment>
      <h3 className="text-primary mb-2">Complete Tournament Results</h3>
      <DocumentList
        query={{
          key: queryKey,
          documentTypes: ["Results"],
          tournamentId: tournamentState.currentTournament.id,
        }}
        documents={documentState.documents[queryKey] || []}
        render={documentRender}
      />
    </React.Fragment>
  );
};

export default TournamentResultList;
