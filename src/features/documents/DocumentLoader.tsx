import React, { useEffect } from "react";

import { useAppDispatch } from "app-store";

import DocumentActions, { IDocumentSearch } from "../../store/DocumentActions";

export interface IDocumentLoaderProps {
  query: IDocumentSearch;
}

const DocumentLoader: React.FC<IDocumentLoaderProps> = (props) => {
  const { query } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(DocumentActions.Load(query));
  }, [dispatch, query]);

  return <></>;
};

export default DocumentLoader;
