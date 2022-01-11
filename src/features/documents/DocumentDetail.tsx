import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import DocumentEdit from "./DocumentEdit";
import { DocumentDetailProps } from "./documentPropTypes";
import DocumentView from "./DocumentView";

const DocumentDetail: React.FC<DocumentDetailProps> = (props) => {
  const permissions = usePermissions();
  const { document, edit, render } = props;
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canEditDocuments()}
      viewComponent={<DocumentView document={document} render={render} />}
      editComponent={<DocumentEdit document={document} onClose={handleClose} />}
    />
  );
};

export default DocumentDetail;
