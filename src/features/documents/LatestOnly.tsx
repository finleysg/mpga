import React from "react";

import LoadingContainer from "components/LoadingContainer";

import { useGetDocumentsQuery } from "./documentApi";
import DocumentList from "./DocumentList";
import { DocumentSearchProps, DocumentViewType, IDocumentRenderProps } from "./documentPropTypes";

const LatestOnly: React.FC<DocumentSearchProps> = (props) => {
  const { query } = props;
  const { data: documents, isLoading } = useGetDocumentsQuery(query);

  const documentRender: IDocumentRenderProps = {
    viewType: DocumentViewType.Button,
    variant: "secondary",
    external: true,
  };

  return (
    <LoadingContainer loading={isLoading}>
      <DocumentList documents={documents?.slice(0, 1) || []} render={documentRender} />
    </LoadingContainer>
  );
};

export default LatestOnly;
