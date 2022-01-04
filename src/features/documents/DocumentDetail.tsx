import React from "react";

import WithEdit from "../../components/WithEdit";
import { MpgaDocument } from "../../models/Documents";
import { DocumentForm } from "../../store/DocumentActions";
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
    <WithEdit
      formName={DocumentForm}
      initEdit={edit}
      canEdit={permissions.canEditDocuments()}
      viewComponent={<DocumentView document={document} render={render} />}
      editComponent={<DocumentEdit document={document} Cancel={Cancel} Delete={Delete} Save={Save} />}
    />
  );
};

export default DocumentDetail;
