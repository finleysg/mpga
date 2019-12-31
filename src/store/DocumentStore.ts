import { Action, Reducer } from "redux";
import { MpgaDocument } from "../models/Documents";
import { DocumentActionTypes } from "./DocumentActions";

export interface IDocumentState {
    data: MpgaDocument[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IDocumentState = {
    data: [],
    isBusy: false,
    hasError: false,
};

export interface IDocumentAppend extends Action {
    type: DocumentActionTypes.APPEND_DOCUMENT;
}

export interface IDocumentCancel extends Action {
    type: DocumentActionTypes.CANCEL_NEW_DOCUMENT;
}

export interface IDocumentsRequested extends Action {
    type: DocumentActionTypes.GET_DOCUMENTS_REQUESTED;
}

export interface IDocumentsSucceeded extends Action {
    type: DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED;
    payload: MpgaDocument[];
}

export interface IDocumentsFailed extends Action {
    type: DocumentActionTypes.GET_DOCUMENTS_FAILED;
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

type KnownActions = IDocumentAppend 
    | IDocumentCancel
    | IDocumentsRequested 
    | IDocumentsSucceeded 
    | IDocumentsFailed
    | IDocumentSaveRequested
    | IDocumentSaveSucceeded
    | IDocumentSaveFailed;

export const DocumentsReducer: Reducer<IDocumentState, KnownActions> =
    (state: IDocumentState | undefined, action: KnownActions): IDocumentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case DocumentActionTypes.APPEND_DOCUMENT: {
            const documents = state.data;
            documents.unshift(new MpgaDocument({}));
            return {...state, data: documents }
        }
        case DocumentActionTypes.CANCEL_NEW_DOCUMENT: {
            const idx = state.data.findIndex(a => a.id === 0);
            if (idx >= 0) {
                const documents = state.data;
                documents.splice(idx, 1);
                return {...state, data: documents};
            }
            return {...state, }
        }
        case DocumentActionTypes.GET_DOCUMENTS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED: {
            return {...state, data: action.payload, isBusy: false};
        }
        case DocumentActionTypes.GET_DOCUMENTS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case DocumentActionTypes.SAVE_DOCUMENT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case DocumentActionTypes.SAVE_DOCUMENT_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
