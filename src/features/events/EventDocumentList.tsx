import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MpgaDocument } from "../../models/Documents";
import { IApplicationState } from "../../store";
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
    const dispatch = useDispatch();
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const documents = documentState.documents.get(queryKey)?.filter((d) => d.documentType === props.documentType);

    const saveDocument = useCallback(
        (document: MpgaDocument, file?: File) => {
            dispatch(DocumentActions.Save(queryKey, document, file));
        },
        [dispatch, queryKey]
    );

    const deleteDocument = useCallback(
        (document: MpgaDocument) => {
            dispatch(DocumentActions.Delete(queryKey, document));
        },
        [dispatch, queryKey]
    );

    return (
        <div>
            {documents && documents.length > 0 && (
                <React.Fragment>
                    <h5 className="mt-1 text-primary">{props.title}</h5>
                    {documents.map((document: MpgaDocument) => {
                        return (
                            <DocumentDetail
                                key={document.id}
                                document={document}
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
