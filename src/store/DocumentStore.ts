import { Action, Reducer } from "redux";
import { MpgaDocument } from "../models/Documents";
import { DocumentActionTypes, IDocumentSearch } from "./DocumentActions";

export interface IDocumentState {
    documents: Map<string, MpgaDocument[]>;
    queries: Map<string, IDocumentSearch>;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IDocumentState = {
    documents: new Map([]),
    queries: new Map([]),
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
    payload: { key: string; documents: MpgaDocument[] };
}

export interface IGetDocumentsFailed extends Action {
    type: DocumentActionTypes.GET_DOCUMENTS_FAILED;
    payload: { key: string };
}

export interface IDocumentSaveRequested extends Action {
    type: DocumentActionTypes.SAVE_DOCUMENT_REQUESTED;
}

export interface IDocumentSaveSucceeded extends Action {
    type: DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED;
}

export interface IDocumentSaveFailed extends Action {
    type: DocumentActionTypes.SAVE_DOCUMENT_FAILED;
}

type KnownActions =
    | IDocumentAppend
    | IDocumentCancel
    | IGetDocumentsRequested
    | IGetDocumentsSucceeded
    | IGetDocumentsFailed
    | IDocumentSaveRequested
    | IDocumentSaveSucceeded
    | IDocumentSaveFailed;

export const DocumentsReducer: Reducer<IDocumentState, KnownActions> = (
    state: IDocumentState | undefined,
    action: KnownActions
): IDocumentState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case DocumentActionTypes.APPEND_DOCUMENT: {
            const query = action.payload.query;
            const documentMap = state.documents;
            const documents = documentMap?.get(query.key) || [];
            const year = query.event?.eventYear || query.year;
            const tournamentId = query.event?.tournament?.id || query.tournamentId;
            const documentType = query.documentTypes && query.documentTypes[0]; // constrained to one type
            documents.push(
                new MpgaDocument({
                    id: 0,
                    title: "",
                    document_type: documentType,
                    year: year,
                    tournament: tournamentId,
                })
            );
            documentMap.set(query.key, documents);
            return { ...state, documents: documentMap };
        }
        case DocumentActionTypes.CANCEL_NEW_DOCUMENT: {
            const key = action.payload.key;
            const documentMap = state.documents;
            const documents = documentMap?.get(key) || [];
            const idx = documents.findIndex((d) => d.id === 0);
            if (idx && idx >= 0) {
                documents.splice(idx, 1);
                documentMap.set(key, documents);
                return { ...state, documents: documentMap };
            }
            return { ...state };
        }
        case DocumentActionTypes.GET_DOCUMENTS_REQUESTED: {
            const key = action.payload.key;
            const queries = state.queries;
            queries.set(key, action.payload.query);
            return { ...state, queries: queries, isBusy: true, hasError: false };
        }
        case DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED: {
            const key = action.payload.key;
            const documentMap = state.documents;
            const sorted = action.payload.documents.sort((d1, d2) => {
                // const a = new Date(d1.lastUpdate!);
                // const b = new Date(d2.lastUpdate!);
                return d1.year > d2.year ? -1 : d1.year < d2.year ? 1 : 0;
            });
            documentMap.set(key, sorted);
            return { ...state, documents: documentMap, isBusy: false };
        }
        case DocumentActionTypes.GET_DOCUMENTS_FAILED: {
            const key = action.payload.key;
            const documentMap = state.documents;
            documentMap.delete(key);
            return { ...state, documents: documentMap, isBusy: false };
        }
        case DocumentActionTypes.SAVE_DOCUMENT_REQUESTED: {
            return { ...state, isBusy: true, hasError: false };
        }
        case DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED: {
            return { ...state, isBusy: false };
        }
        case DocumentActionTypes.SAVE_DOCUMENT_FAILED: {
            return { ...state, isBusy: false, hasError: true };
        }
        default:
            return state;
    }
};
