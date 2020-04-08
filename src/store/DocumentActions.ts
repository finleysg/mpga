import { Api } from "../http";
import { MpgaDocument } from "../models/Documents";
import { EventDetail } from "../models/Events";
import { IApplicationState } from "./";
import NotificationActions from "./NotificationActions";

export interface IDocumentSearch {
    key: string;
    event?: EventDetail;
    tournamentId?: number;
    year?: number;
    documentTypes?: string[];
    tags?: string[];
}

export enum DocumentActionTypes {
    APPEND_DOCUMENT = "APPEND_DOCUMENT",
    CANCEL_NEW_DOCUMENT = "CANCEL_NEW_DOCUMENT",
    GET_DOCUMENTS_REQUESTED = "GET_DOCUMENTS_REQUESTED",
    GET_DOCUMENTS_SUCCEEDED = "GET_DOCUMENTS_SUCCEEDED",
    GET_DOCUMENTS_FAILED = "GET_DOCUMENTS_FAILED",
    SAVE_DOCUMENT_REQUESTED = "SAVE_DOCUMENT_REQUESTED",
    SAVE_DOCUMENT_SUCCEEDED = "SAVE_DOCUMENT_SUCCEEDED",
    SAVE_DOCUMENT_FAILED = "SAVE_DOCUMENT_FAILED",
}

const url = "/documents/";

const prepareFormData = (document: MpgaDocument, file?: File): FormData => {
    const form = new FormData();
    if (document.id) {
        form.append("id", document.id.toString());
    }
    if (document.tournament) {
        form.append("tournament", document.tournament.toString());
    }
    if (document.tags) {
        form.append("tags", document.tags.map((t) => t.name).join("|"));
    }
    form.append("document_type", document.documentType);
    form.append("year", document.year.toString());
    form.append("title", document.title);
    if (file) {
        form.append("file", file, file.name);
    }
    return form;
};

const prepareQueryString = (query: IDocumentSearch): string => {
    const year = query.event?.eventYear || query.year || 0;
    const tournamentId = query.event?.tournament?.id || query.tournamentId || 0;
    let queryString = "?d=1";
    if (year > 0) {
        queryString = queryString + `&year=${year}`;
    }
    if (tournamentId > 0) {
        queryString = queryString + `&tournament=${tournamentId}`;
    }
    if (query.documentTypes) {
        queryString = queryString + query.documentTypes.map((t) => `&type=${t}`);
    }
    if (query.tags) {
        queryString = queryString + `&tags=${query.tags}`;
    }
    return queryString;
};

const DocumentActions = {
    AddNew: (query: IDocumentSearch) => (dispatch: any) => {
        dispatch({ type: DocumentActionTypes.APPEND_DOCUMENT, payload: { query: query } });
    },

    CancelNew: (key: string) => (dispatch: any) => {
        dispatch({ type: DocumentActionTypes.CANCEL_NEW_DOCUMENT, payload: { key: key } });
    },

    Load: (query: IDocumentSearch) => async (dispatch: any) => {
        dispatch({ type: DocumentActionTypes.GET_DOCUMENTS_REQUESTED, payload: { key: query.key, query: query } });
        try {
            const queryString = prepareQueryString(query);
            const result = await Api.get(`${url}${queryString}`);
            const data = result.data.map((json: any) => new MpgaDocument(json));
            dispatch({
                type: DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED,
                payload: { key: query.key, documents: data },
            });
        } catch (error) {
            dispatch({ type: DocumentActionTypes.GET_DOCUMENTS_FAILED, payload: { key: query.key } });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    Save: (key: string, document: MpgaDocument, file?: File) => async (
        dispatch: any,
        getState: () => IApplicationState
    ) => {
        const queries = getState().documents.queries;
        const requery = queries.has(key) && queries.get(key);
        dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_REQUESTED });
        try {
            const payload = prepareFormData(document, file);
            if (!document.id) {
                await Api.post(url, payload);
            } else {
                await Api.patch(`${url}${document.id}/`, payload);
            }
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED });
            if (requery) {
                dispatch(DocumentActions.Load(requery));
            }
            dispatch(NotificationActions.ToastSuccess(`${document.title} has been saved.`));
        } catch (error) {
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    Delete: (key: string, document: MpgaDocument) => async (dispatch: any, getState: () => IApplicationState) => {
        const queries = getState().documents.queries;
        const requery = queries.has(key) && queries.get(key);
        dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_REQUESTED });
        try {
            await Api.delete(`${url}${document.id}/`);
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED });
            if (requery) {
                dispatch(DocumentActions.Load(requery));
            }
            dispatch(NotificationActions.ToastSuccess(`${document.title} has been deleted.`));
        } catch (error) {
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default DocumentActions;
