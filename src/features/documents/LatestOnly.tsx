import React from "react";

import { useAppSelector } from "app-store";

import { IDocumentSearch } from "../../store/DocumentActions";
import DocumentList from "./DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "./DocumentView";

export interface ILatestOnlyProps {
  query: IDocumentSearch;
}

const LatestOnly: React.FC<ILatestOnlyProps> = (props) => {
  const { query } = props;
  const documentState = useAppSelector((state) => state.documents);
  const documentRender: IDocumentRenderProps = {
    viewType: DocumentViewType.Button,
    variant: "secondary",
    external: true,
  };

  return (
    <React.Fragment>
      <DocumentList
        query={query}
        documents={documentState.documents[query.key]?.slice(0, 1) || []}
        render={documentRender}
      />
    </React.Fragment>
  );
};

export default LatestOnly;
