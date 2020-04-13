import React from "react";

import EditableDiv from "../../components/EditableDiv";
import { MpgaDocument } from "../../models/Documents";
import usePermissions from "../../utilities/Permissions";
import DocumentEdit from "./DocumentEdit";
import DocumentView, { IDocumentViewProps } from "./DocumentView";

export interface IDocumentDetail extends IDocumentViewProps {
    edit: boolean;
    Cancel: () => void;
    Save: (document: MpgaDocument, file?: File) => void;
    Delete: (document: MpgaDocument) => void;
}

const DocumentDetail: React.FC<IDocumentDetail> = (props) => {
    const permissions = usePermissions();
    const { document, edit, render, Cancel, Delete, Save } = props;

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={permissions.canEditDocuments()}
            viewComponent={<DocumentView document={document} render={render} />}
            editComponent={<DocumentEdit document={document} Cancel={Cancel} Delete={Delete} Save={Save} />}
        />
    );
};

export default DocumentDetail;
