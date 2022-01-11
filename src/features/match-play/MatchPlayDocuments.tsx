import React from "react";

import LoadingContainer from "components/LoadingContainer";
import { useGetDocumentsQuery } from "features/documents/documentApi";
import { DocumentViewType, IDocumentRenderProps, IDocumentSearch } from "features/documents/documentPropTypes";

import constants from "../../constants";
import DocumentList from "../documents/DocumentList";

const MatchPlayDocuments: React.FC = () => {
  const queryKey = "match-play";

  const query: IDocumentSearch = {
    key: queryKey,
    documentTypes: ["Match Play", "Match Play Brackets"],
    year: constants.MatchPlayYear,
  };

  const { data: documents, isLoading } = useGetDocumentsQuery(query);

  const documentRender: IDocumentRenderProps = {
    viewType: DocumentViewType.Button,
    variant: "outline-secondary",
    external: true,
  };

  return (
    <LoadingContainer loading={isLoading}>
      <DocumentList documents={documents || []} render={documentRender} />;
    </LoadingContainer>
  );
};

export default MatchPlayDocuments;
