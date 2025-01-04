import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"

import constants from "../../app-constants"
import LoadingContainer from "../../components/LoadingContainer"
import { MpgaDocument } from "../../models/Documents"
import { useGetAppConfigQuery } from "../content/contentApi"
import { useGetDocumentsQuery } from "./documentApi"
import DocumentEditModal from "./DocumentEditModal"
import DocumentLibraryRow from "./DocumentLibraryRow"
import DocumentLibrarySearch from "./DocumentLibrarySearch"
import { IDocumentSearch } from "./documentPropTypes"

const DocumentLibraryList: React.FC = () => {
  const { data: appConfig } = useGetAppConfigQuery()

  const [doEdit, updateDoEdit] = useState(false);
  const [docToEdit, updateDocToEdit] = useState<MpgaDocument>();
  const [query, updateQuery] = useState<IDocumentSearch>({
    key: "library",
  });
  const { data: documents, isLoading } = useGetDocumentsQuery(query);

  const createNewDocument = () => {
    updateDocToEdit(new MpgaDocument({ id: 0, year: appConfig?.eventCalendarYear || constants.CurrentYear }));
    updateDoEdit(true);
  };

  const editExistingDocument = (doc: MpgaDocument) => {
    updateDocToEdit(doc);
    updateDoEdit(true);
  };

  return (
    <React.Fragment>
      <h3 className="text-primary mb-2">MPGA Document Library</h3>
      <React.Fragment>
        <h5 className="text-secondary">Search</h5>
        <DocumentLibrarySearch query={query} onSearch={(query) => updateQuery(query)} />
      </React.Fragment>
      <LoadingContainer loading={isLoading}>
        <Button variant="link" className="text-warning" onClick={() => createNewDocument()}>
          Add New Document
        </Button>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Year</th>
              <th>Title</th>
              <th>Document Type</th>
              <th>Tournament</th>
              <th>Last Updated</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents?.map((doc) => {
              return (
                <DocumentLibraryRow
                  key={doc.id}
                  document={new MpgaDocument(doc)}
                  onEdit={(document) => editExistingDocument(document)}
                />
              );
            })}
          </tbody>
        </Table>
        <DocumentEditModal show={doEdit} document={docToEdit} onClose={() => updateDoEdit(false)} />
      </LoadingContainer>
    </React.Fragment>
  );
};

export default DocumentLibraryList;
