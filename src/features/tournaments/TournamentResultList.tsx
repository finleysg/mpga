import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetDocumentsQuery } from "features/documents/documentApi";
import { DocumentViewType, IDocumentRenderProps } from "features/documents/documentPropTypes";

import DocumentList from "../documents/DocumentList";
import { TournamentDetailProps } from "./tournamentPropTypes";

const TournamentResultList: React.FC<TournamentDetailProps> = (props) => {
  const { tournament } = props;

  const documentRender: IDocumentRenderProps = {
    viewType: DocumentViewType.Link,
    variant: "info",
    external: true,
  };
  const { data: documents, isLoading } = useGetDocumentsQuery({
    key: `${tournament.systemName}-results`,
    tournamentId: tournament.id,
    documentTypes: ["Results"],
  });

  return (
    <LoadingContainer loading={isLoading}>
      <h3 className="text-primary mb-2">Complete Tournament Results</h3>
      <DocumentList documents={documents || []} render={documentRender} />
    </LoadingContainer>
  );
};

export default TournamentResultList;
