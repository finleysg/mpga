import { Api } from "../http";
import NotificationActions from "./NotificationActions";
import { MpgaPhoto } from "../models/Documents";
import { IApplicationState } from ".";

export enum PhotoActionTypes {
    APPEND_PHOTO = "APPEND_PHOTO",
    CANCEL_NEW_PHOTO = "CANCEL_NEW_PHOTO",
    GET_PHOTOS_REQUESTED = "GET_PHOTOS_REQUESTED",
    GET_PHOTOS_SUCCEEDED = "GET_PHOTOS_SUCCEEDED",
    GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED",
    SAVE_PHOTO_REQUESTED = "SAVE_PHOTO_REQUESTED",
    SAVE_PHOTO_SUCCEEDED = "SAVE_PHOTO_SUCCEEDED",
    SAVE_PHOTO_FAILED = "SAVE_PHOTO_FAILED",
};

const url = "/photos/";

const prepareFormData = (file: File, photo: MpgaPhoto): FormData => {
    const form = new FormData();
    if (photo.id) {
        form.append("id", photo.id.toString());
    }
    if (photo.tournament) {
        form.append("tournament", photo.tournament.toString());
    }
    if (photo.tags) {
        form.append("tags", photo.tags.map(t => t.name).join("|"));
    }
    form.append("photo_type", photo.photoType);
    form.append("year", photo.year.toString());
    form.append("caption", photo.caption || "");
    form.append("file", file, file.name);
    return form;
};

const PhotoActions = {
    AddNewPhoto: () => (dispatch: any) => {
        dispatch({type: PhotoActionTypes.APPEND_PHOTO});
    },

    CancelNewPhoto: () => (dispatch: any) => {
        dispatch({type: PhotoActionTypes.CANCEL_NEW_PHOTO});
    },

    LoadTournamentPhotos: () => async (dispatch: any, getState: () => IApplicationState) => {
        const tournament = getState().tournament.tournament;
        if (tournament && tournament.id) {
            dispatch({ type: PhotoActionTypes.GET_PHOTOS_REQUESTED});
            try {
                const result = await Api.get(`${url}?tournament=${tournament.id}`);
                const data = result.data.map((json: any) => new MpgaPhoto(json));
                dispatch({ type: PhotoActionTypes.GET_PHOTOS_SUCCEEDED, payload: data });
            } catch (error) {
                dispatch({ type: PhotoActionTypes.GET_PHOTOS_FAILED });
                dispatch(NotificationActions.ToastError(error));
            }
        }
    },

    SavePhoto: (file: File, photo: MpgaPhoto, loadTournamentPhotos: boolean = false) => async (dispatch: any) => {
        dispatch({ type: PhotoActionTypes.SAVE_PHOTO_REQUESTED});
        try {
            const payload = prepareFormData(file, photo);
            if (!photo.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${photo.id}/`, payload);
            }
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_SUCCEEDED });
            dispatch(NotificationActions.ToastSuccess("Your picture has been saved."))
            if (loadTournamentPhotos) {
                dispatch(PhotoActions.LoadTournamentPhotos());
            }
        } catch (error) {
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
}

export default PhotoActions;
