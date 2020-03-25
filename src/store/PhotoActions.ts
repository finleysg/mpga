import { Api } from "../http";
import NotificationActions from "./NotificationActions";
import { MpgaPhoto } from "../models/Documents";
import { IApplicationState } from ".";
import { Tournament } from '../models/Events';

export enum PhotoActionTypes {
    APPEND_PHOTO = "APPEND_PHOTO",
    CANCEL_NEW_PHOTO = "CANCEL_NEW_PHOTO",
    GET_PHOTOS_REQUESTED = "GET_PHOTOS_REQUESTED",
    GET_PHOTOS_SUCCEEDED = "GET_PHOTOS_SUCCEEDED",
    GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED",
    GET_RANDOM_PHOTO_REQUESTED = "GET_RANDOM_PHOTO_REQUESTED",
    GET_RANDOM_PHOTO_SUCCEEDED = "GET_RANDOM_PHOTO_SUCCEEDED",
    GET_RANDOM_PHOTO_FAILED = "GET_RANDOM_PHOTO_FAILED",
    SAVE_PHOTO_REQUESTED = "SAVE_PHOTO_REQUESTED",
    SAVE_PHOTO_SUCCEEDED = "SAVE_PHOTO_SUCCEEDED",
    SAVE_PHOTO_FAILED = "SAVE_PHOTO_FAILED",
};

const url = "/photos/";

const prepareFormData = (photo: MpgaPhoto, file: File): FormData => {
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
    form.append("raw_image", file, file.name);
    return form;
};

const PhotoActions = {
    AddNewPhoto: () => (dispatch: any) => {
        dispatch({type: PhotoActionTypes.APPEND_PHOTO});
    },

    CancelNewPhoto: () => (dispatch: any) => {
        dispatch({type: PhotoActionTypes.CANCEL_NEW_PHOTO});
    },

    LoadRandomPhoto: (tournament: Tournament) => async (dispatch: any) => {
        dispatch({ type: PhotoActionTypes.GET_RANDOM_PHOTO_REQUESTED});
        try {
            const result = await Api.get(`/tournament-photos/random/${tournament.id}/`);
            const data = new MpgaPhoto(result.data);
            dispatch({ type: PhotoActionTypes.GET_RANDOM_PHOTO_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: PhotoActionTypes.GET_RANDOM_PHOTO_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    LoadTournamentPhotos: (year?: number) => async (dispatch: any, getState: () => IApplicationState) => {
        const tournament = getState().tournament.currentTournament;
        if (tournament && tournament.id) {
            dispatch({ type: PhotoActionTypes.GET_PHOTOS_REQUESTED});
            try {
                const requestUrl = year ? `${url}?tournament=${tournament.id}&year=${year}` : `${url}?tournament=${tournament.id}`;
                const result = await Api.get(requestUrl);
                const data = result.data.map((json: any) => new MpgaPhoto(json));
                dispatch({ type: PhotoActionTypes.GET_PHOTOS_SUCCEEDED, payload: data });
            } catch (error) {
                dispatch({ type: PhotoActionTypes.GET_PHOTOS_FAILED });
                dispatch(NotificationActions.ToastError(error));
            }
        }
    },

    UploadPhoto: (photo: MpgaPhoto, file: File) => async (dispatch: any) => {
        dispatch({ type: PhotoActionTypes.SAVE_PHOTO_REQUESTED});
        try {
            const payload = prepareFormData(photo, file);
            const result = await Api.post(url, payload);
            const data = new MpgaPhoto(result.data);
            dispatch({ type: PhotoActionTypes.GET_RANDOM_PHOTO_SUCCEEDED, payload: data });
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_SUCCEEDED });
            dispatch(NotificationActions.ToastSuccess("Your picture has been saved."))
        } catch (error) {
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    UpdatePhoto: (photo: MpgaPhoto) => async (dispatch: any) => {
        dispatch({ type: PhotoActionTypes.SAVE_PHOTO_REQUESTED});
        try {
            const payload = photo.prepJson();
            await Api.patch(`${url}${photo.id}/`, payload);
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_SUCCEEDED });
            dispatch(NotificationActions.ToastSuccess("Your changes have been saved."))
            dispatch(PhotoActions.LoadTournamentPhotos(photo.year));
        } catch (error) {
            dispatch({ type: PhotoActionTypes.SAVE_PHOTO_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
}

export default PhotoActions;
