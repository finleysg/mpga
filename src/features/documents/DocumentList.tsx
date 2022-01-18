import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import constants from "../../app-constants";
import { MpgaDocument } from "../../models/Documents";
import usePermissions from "../../utilities/Permissions";
import DocumentDetail from "./DocumentDetail";
import { DocumentListProps } from "./documentPropTypes";

const DocumentList: React.FC<DocumentListProps> = (props) => {
  const { documents, render } = props;
  const [addNew, setAddNew] = useState(false);
  const permissions = usePermissions();
  const canAdd = documents?.findIndex((d) => d.id === 0) || -1 < 0;

  return (
    <div>
      {permissions.canEditDocuments() && (
        <Button variant="link" className="text-warning" disabled={!canAdd} onClick={() => setAddNew(true)}>
          Add New
        </Button>
      )}
      {addNew && (
        <DocumentDetail
          key={0}
          document={new MpgaDocument({ id: 0, year: constants.EventCalendarYear })}
          render={render}
          edit={true}
          onClose={() => setAddNew(false)}
        />
      )}
      {documents?.map((document) => {
        return (
          <DocumentDetail
            key={document.id}
            document={new MpgaDocument(document)}
            render={render}
            edit={false}
            onClose={() => setAddNew(false)}
          />
        );
      })}
    </div>
  );
};

export default DocumentList;
