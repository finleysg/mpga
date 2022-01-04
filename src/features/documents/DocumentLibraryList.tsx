import React, { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import LoadingContainer from "../../components/LoadingContainer";
import { MpgaDocument } from "../../models/Documents";
import DocumentActions, { IDocumentSearch } from "../../store/DocumentActions";
import TournamentActions from "../../store/TournamentActions";
import DocumentEditModal from "./DocumentEditModal";
import DocumentLibraryRow from "./DocumentLibraryRow";
import DocumentLibrarySearch from "./DocumentLibrarySearch";

const DocumentLibraryList: React.FC = () => {
  const [doEdit, updateDoEdit] = useState(false);
  const [docToEdit, updateDocToEdit] = useState<MpgaDocument>();
  const [query, updateQuery] = useState<IDocumentSearch>({
    key: "library",
    // year: new Date().getFullYear(),
  });
  const dispatch = useAppDispatch();
  const documentState = useAppSelector((state) => state.documents);
  const tournamentState = useAppSelector((state) => state.tournament);

  useEffect(() => {
    dispatch(DocumentActions.Load(query));
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(TournamentActions.LoadTournaments());
  }, [dispatch]);

  const saveDocument = useCallback(
    (document: MpgaDocument, file?: File) => {
      dispatch(DocumentActions.Save(query.key, document, file));
      updateDocToEdit(undefined);
      updateDoEdit(false);
    },
    [dispatch, query],
  );

  const deleteDocument = useCallback(
    (document: MpgaDocument) => {
      dispatch(DocumentActions.Delete(query.key, document));
      updateDocToEdit(undefined);
      updateDoEdit(false);
    },
    [dispatch, query],
  );

  const cancelEdit = () => {
    if ((docToEdit?.id || 0) === 0) {
      dispatch(DocumentActions.CancelNew("library"));
    }
    updateDocToEdit(undefined);
    updateDoEdit(false);
  };

  const createNewDocument = () => {
    dispatch(DocumentActions.AddNew(query));
    const doc = documentState.documents["library"]?.find((d) => d.id === 0) || { id: 0 };
    updateDocToEdit(new MpgaDocument(doc));
    updateDoEdit(true);
  };

  const editExistingDocument = (doc: MpgaDocument) => {
    updateDocToEdit(doc);
    updateDoEdit(true);
  };

  const getDocuments = () => {
    if (Object.prototype.hasOwnProperty.call(documentState.documents, query.key)) {
      return documentState.documents[query.key]?.map((doc) => new MpgaDocument(doc));
    }
    return [];
  };

  return (
    <React.Fragment>
      <h3 className="text-primary mb-2">MPGA Document Library</h3>
      <React.Fragment>
        <h5 className="text-secondary">Search</h5>
        <DocumentLibrarySearch
          query={query}
          tournaments={tournamentState.tournaments}
          OnSearch={(query) => updateQuery(query)}
        />
      </React.Fragment>
      <LoadingContainer loading={documentState.isBusy}>
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
            {getDocuments()?.map((doc: MpgaDocument, idx: number) => {
              return (
                <DocumentLibraryRow
                  key={idx}
                  document={doc}
                  tournaments={new Map(tournamentState.tournaments.map((t) => [t.id!, t.name]))}
                  OnEdit={(document) => editExistingDocument(document)}
                />
              );
            })}
          </tbody>
        </Table>
        <DocumentEditModal
          show={doEdit}
          document={docToEdit!}
          tournaments={tournamentState.tournaments}
          Save={saveDocument}
          Delete={deleteDocument}
          Cancel={cancelEdit}
        />
      </LoadingContainer>
    </React.Fragment>
  );
};

export default DocumentLibraryList;
