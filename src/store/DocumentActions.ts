import { Api } from '../http';
import { MpgaDocument } from '../models/Documents';
import NotificationActions from './NotificationActions';

export enum DocumentActionTypes {
    APPEND_DOCUMENT = "APPEND_DOCUMENT",
    CANCEL_NEW_DOCUMENT = "CANCEL_NEW_DOCUMENT",
    GET_DOCUMENTS_REQUESTED = "GET_DOCUMENTS_REQUESTED",
    GET_DOCUMENTS_SUCCEEDED = "GET_DOCUMENTS_SUCCEEDED",
    GET_DOCUMENTS_FAILED = "GET_DOCUMENTS_FAILED",
    SAVE_DOCUMENT_REQUESTED = "SAVE_DOCUMENT_REQUESTED",
    SAVE_DOCUMENT_SUCCEEDED = "SAVE_DOCUMENT_SUCCEEDED",
    SAVE_DOCUMENT_FAILED = "SAVE_DOCUMENT_FAILED",
};

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
        form.append('tags', document.tags.map(t => t.name).join('|'));
    }
    form.append("document_type", document.documentType);
    form.append("year", document.year.toString());
    form.append("title", document.title);
    form.append("file", file, file.name);
    return form;
};

const DocumentActions = {
    AddNew: () => (dispatch: any) => {
        dispatch({type: DocumentActionTypes.APPEND_DOCUMENT});
    },

    CancelNew: () => (dispatch: any) => {
        dispatch({type: DocumentActionTypes.CANCEL_NEW_DOCUMENT});
    },

    Load: () => async (dispatch: any) => {
        dispatch({ type: DocumentActionTypes.GET_DOCUMENTS_REQUESTED});
        try {
            const result = await Api.get(url);
            const data = result.data.map((json: any) => new MpgaDocument(json));
            dispatch({ type: DocumentActionTypes.GET_DOCUMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: DocumentActionTypes.GET_DOCUMENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    Save: (file: File, document: MpgaDocument) => async (dispatch: any) => {
        dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_REQUESTED});
        try {
            const payload = prepareFormData(file, document);
            if (!document.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${document.id}/`, payload);
            }
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_SUCCEEDED });
            dispatch(DocumentActions.Load());
            dispatch(NotificationActions.ToastSuccess(`${document.title} has been saved.`))
        } catch (error) {
            dispatch({ type: DocumentActionTypes.SAVE_DOCUMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
}

export default DocumentActions;
