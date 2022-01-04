import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import { IDocumentData } from "services/Data";

import { MpgaDocument } from "../../models/Documents";
import DocumentActions from "../../store/DocumentActions";
import DocumentDetail from "../documents/DocumentDetail";
import { DocumentViewType, IDocumentRenderProps } from "../documents/DocumentView";

export interface IDocumentListProps {
  queryKey: string;
  title: string;
  documentType: string;
}

const render = {
  viewType: DocumentViewType.Link,
  external: true,
  variant: "secondary",
} as IDocumentRenderProps;

const EventDocumentList: React.FC<IDocumentListProps> = (props) => {
  const { queryKey } = props;
  const dispatch = useAppDispatch();
  const documentState = useAppSelector((state) => state.documents);
  const documents = documentState.documents[queryKey]?.filter((d) => d.documentType === props.documentType);

  const saveDocument = useCallback(
    (document: MpgaDocument, file?: File) => {
      dispatch(DocumentActions.Save(queryKey, document, file));
    },
    [dispatch, queryKey],
  );

  const deleteDocument = useCallback(
    (document: MpgaDocument) => {
      dispatch(DocumentActions.Delete(queryKey, document));
    },
    [dispatch, queryKey],
  );

  return (
    <div>
      {documents && documents.length > 0 && (
        <React.Fragment>
          <h5 className="mt-1 text-primary">{props.title}</h5>
          {documents.map((document: IDocumentData) => {
            return (
              <DocumentDetail
                key={document.id}
                document={new MpgaDocument(document)}
                render={render}
                edit={document.id === 0}
                Cancel={() => dispatch(DocumentActions.CancelNew(queryKey))}
                Delete={deleteDocument}
                Save={saveDocument}
              />
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default EventDocumentList;
