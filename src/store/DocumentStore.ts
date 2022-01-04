import { Action, Reducer } from "redux";
import { IDocumentData } from "services/Data";

import { DocumentActionTypes, IDocumentSearch } from "./DocumentActions";

export interface IDocumentState {
  documents: object;
  queries: object;
  isBusy: boolean;
  hasError: boolean;
}

export const defaultState: IDocumentState = {
  documents: {},
  queries: {},
  isBusy: false,
  hasError: false,
};

export interface IDocumentAppend extends Action {
  type: DocumentActionTypes.APPEND_DOCUMENT;
  payload: { query: IDocumentSearch };
}

export interface IDocumentCancel extends Action {
  type: DocumentActionTypes.CANCEL_NEW_DOCUMENT;
  payload: { key: string };
}

export interface IGetDocumentsRequested extends Action {
  type: DocumentActionTypes.GET_DOCUMENTS_REQUESTED;
  payload: { key: string; query: IDocumentSearch };
}

export interface IGetDocumentsSucceeded extends Action {
  type: DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED;
  payload: { key: string; documents: IDocumentData[] };
}

export interface IGetDocumentsFailed extends Action {
  type: DocumentActionTypes.GET_DOCUMENTS_FAILED;
  payload: { key: string };
}

type KnownActions =
  | IDocumentAppend
  | IDocumentCancel
  | IGetDocumentsRequested
  | IGetDocumentsSucceeded
  | IGetDocumentsFailed;

export const DocumentsReducer: Reducer<IDocumentState, KnownActions> = (
  state: IDocumentState | undefined,
  action: KnownActions,
): IDocumentState => {
  if (!state) {
    state = { ...defaultState };
  }

  switch (action.type) {
    case DocumentActionTypes.APPEND_DOCUMENT: {
      const query = action.payload.query;
      const documentMap = Object.assign({}, state.documents);
      const documents = documentMap?.[query.key] || [];
      const year = query.year;
      const tournamentId = query.tournamentId;
      const documentType = query.documentTypes && query.documentTypes[0]; // constrained to one type
      documents.push({
        id: 0,
        title: "",
        document_type: documentType,
        year: year,
        tournament: tournamentId,
      });
      documentMap[query.key] = documents;
      return { ...state, documents: documentMap };
    }
    case DocumentActionTypes.CANCEL_NEW_DOCUMENT: {
      const key = action.payload.key;
      const documentMap = Object.assign({}, state.documents);
      const documents = documentMap?.[key] || [];
      const idx = documents.findIndex((d) => d.id === 0);
      if (idx >= 0) {
        documents.splice(idx, 1);
        documentMap[key] = documents;
        return { ...state, documents: documentMap };
      }
      return { ...state };
    }
    case DocumentActionTypes.GET_DOCUMENTS_REQUESTED: {
      const key = action.payload.key;
      const queries = Object.assign({}, state.queries);
      queries[key] = action.payload.query;
      return { ...state, queries: queries, isBusy: true, hasError: false };
    }
    case DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED: {
      const key = action.payload.key;
      const documentMap = Object.assign({}, state.documents);
      const sorted = action.payload.documents.sort((d1, d2) => {
        return d1.year > d2.year ? -1 : d1.year < d2.year ? 1 : 0;
      });
      documentMap[key] = sorted;
      return { ...state, documents: documentMap, isBusy: false };
    }
    case DocumentActionTypes.GET_DOCUMENTS_FAILED: {
      const key = action.payload.key;
      const documentMap = Object.assign({}, state.documents);
      documentMap[key] = [];
      return { ...state, documents: documentMap, isBusy: false };
    }
    default:
      return state;
  }
};
