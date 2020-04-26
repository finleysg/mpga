import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

import { MpgaDocument } from "../../models/Documents";
import DocumentActions, { IDocumentSearch } from "../../store/DocumentActions";
import usePermissions from "../../utilities/Permissions";
import DocumentDetail from "./DocumentDetail";
import { IDocumentRenderProps } from "./DocumentView";
import LoadingContainer from "../../components/LoadingContainer";

export interface IDocumentListProps {
    query: IDocumentSearch;
    documents: MpgaDocument[];
    render: IDocumentRenderProps;
}

const DocumentList: React.FC<IDocumentListProps> = (props) => {
    const { query, documents } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const canAdd = documents?.findIndex((d) => d.id === 0) || -1 < 0;

    const saveDocument = useCallback(
        (document: MpgaDocument, file?: File) => {
            dispatch(DocumentActions.Save(query.key, document, file));
        },
        [dispatch, query]
    );

    const deleteDocument = useCallback(
        (document: MpgaDocument) => {
            dispatch(DocumentActions.Delete(query.key, document));
        },
        [dispatch, query]
    );

    return (
        <div>
            {permissions.canEditDocuments() && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(DocumentActions.AddNew(query))}>
                    Add New
                </Button>
            )}
            <LoadingContainer hasData={true}>
                {documents.map((document: MpgaDocument) => {
                    return (
                        <DocumentDetail
                            key={document.id}
                            document={document}
                            render={props.render}
                            edit={document.id === 0}
                            Cancel={() => dispatch(DocumentActions.CancelNew(query.key))}
                            Delete={deleteDocument}
                            Save={saveDocument}
                        />
                    );
                })}
            </LoadingContainer>
        </div>
    );
};

export default DocumentList;
