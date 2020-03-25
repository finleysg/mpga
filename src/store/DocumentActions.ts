import constants from '../constants';
import { Api } from '../http';
import { MpgaDocument } from '../models/Documents';
import { EventDetail, Tournament } from '../models/Events';
import NotificationActions from './NotificationActions';
import { IApplicationState } from '.';

export interface IDocumentSearch {
    key: string;
    event?: EventDetail;
    tournament?: Tournament;
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

const prepareFormData = (file: File, document: MpgaDocument): FormData => {
    const form = new FormData();
    if (document.id) {
        form.append("id", document.id.toString());
    }
    if (document.tournament) {
        form.append("tournament", document.tournament.toString());
    }
    if (document.tags) {
        form.append("tags", document.tags.map(t => t.name).join("|"));
    }
    form.append("document_type", document.documentType);
    form.append("year", document.year.toString());
    form.append("title", document.title);
    form.append("file", file, file.name);
    return form;
};

const prepareQueryString = (query: IDocumentSearch): string => {
    const year = query.event?.eventYear || query.year || constants.EventCalendarYear;
    const tournamentId = query.event?.tournament?.id || query.tournament?.id || 0;
    let queryString = `?year=${year}`;
    if (tournamentId > 0) {
        queryString = queryString + `&tournament=${tournamentId}`;
    }
    if (query.documentTypes) {
        queryString = queryString + query.documentTypes.map(t => `&type=${t}`);
    }
    if (query.tags) {
        queryString = queryString + query.tags.map(t => `&tag=${t}`);
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

    Save: (key: string, file: File, document: MpgaDocument) => async (dispatch: any, getState: () => IApplicationState) => {
        const queries = getState().documents.queries;
        const requery = queries.has(key) && queries.get(key);
        dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_REQUESTED });
        try {
            const payload = prepareFormData(file, document);
            if (!document.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${document.id}/`, payload);
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
