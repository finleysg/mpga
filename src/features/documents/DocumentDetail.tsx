import React, { useCallback } from "react";
import DocumentEdit from "./DocumentEdit";
import DocumentView, { IDocumentView } from "./DocumentView";
import EditableDiv from "../../components/EditableDiv";
import { useDispatch } from "react-redux";
import DocumentActions from "../../store/DocumentActions";
import { MpgaDocument } from "../../models/Documents";

export interface IDocumentDetail extends IDocumentView {
    edit: boolean,
};

const DocumentDetail: React.FC<IDocumentDetail> = (props) => {
    const dispatch = useDispatch();
    const { document, edit } = props;

    const saveDocument = useCallback(
        (file: File, document: MpgaDocument) => dispatch(DocumentActions.Save(file, document)),
        [dispatch]
    );

    return (
        <EditableDiv initEdit={edit} canEdit={true}
            viewComponent={<DocumentView document={document} />}
            editComponent={
                <DocumentEdit document={document} 
                    Cancel={() => dispatch(DocumentActions.CancelNew)} 
                    Save={saveDocument} />
            }>
        </EditableDiv>
    );
}

export default DocumentDetail;
