import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app-store";

import constants from "../../constants";
import { IApplicationState } from "../../store";
import DocumentActions, { IDocumentSearch } from "../../store/DocumentActions";
import DocumentList from "../documents/DocumentList";
import { DocumentViewType, IDocumentRenderProps } from "../documents/DocumentView";

const MatchPlayDocuments: React.FC = () => {
  const dispatch = useAppDispatch();
  const documentState = useAppSelector((state: IApplicationState) => state.documents);
  const queryKey = "match-play";

  const query: IDocumentSearch = {
    key: queryKey,
    documentTypes: ["Match Play", "Match Play Brackets"],
    year: constants.MatchPlayYear,
  };

  const documents = () => {
    return documentState.documents[queryKey]?.filter((d) => query.documentTypes!.indexOf(d.documentType) >= 0);
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
