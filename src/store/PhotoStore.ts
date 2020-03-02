import { Action, Reducer } from "redux";
import { MpgaPhoto } from "../models/Documents";
import { PhotoActionTypes } from "./PhotoActions";

export interface IPhotoState {
    data: MpgaPhoto[];
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IPhotoState = {
    data: [],
    isBusy: false,
    hasError: false,
};

export interface IPhotoAppend extends Action {
    type: PhotoActionTypes.APPEND_PHOTO;
}

export interface IPhotoCancel extends Action {
    type: PhotoActionTypes.CANCEL_NEW_PHOTO;
}

export interface IPhotosRequested extends Action {
    type: PhotoActionTypes.GET_PHOTOS_REQUESTED;
}

export interface IPhotosSucceeded extends Action {
    type: PhotoActionTypes.GET_PHOTOS_SUCCEEDED;
    payload: MpgaPhoto[];
}

export interface IPhotosFailed extends Action {
    type: PhotoActionTypes.GET_PHOTOS_FAILED;
}

export interface IPhotoSaveRequested extends Action {
    type: PhotoActionTypes.SAVE_PHOTO_REQUESTED;
}

export interface IPhotoSaveSucceeded extends Action {
    type: PhotoActionTypes.SAVE_PHOTO_SUCCEEDED;
}

export interface IPhotoSaveFailed extends Action {
    type: PhotoActionTypes.SAVE_PHOTO_FAILED;
}

type KnownActions = IPhotoAppend 
    | IPhotoCancel
    | IPhotosRequested 
    | IPhotosSucceeded 
    | IPhotosFailed
    | IPhotoSaveRequested
    | IPhotoSaveSucceeded
    | IPhotoSaveFailed;

export const PhotosReducer: Reducer<IPhotoState, KnownActions> =
    (state: IPhotoState | undefined, action: KnownActions): IPhotoState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case PhotoActionTypes.APPEND_PHOTO: {
            const photos = state.data;
            photos.unshift(new MpgaPhoto({}));
            return {...state, data: photos }
        }
        case PhotoActionTypes.CANCEL_NEW_PHOTO: {
            const idx = state.data.findIndex(a => a.id === 0);
            if (idx >= 0) {
                const photos = state.data;
                photos.splice(idx, 1);
                return {...state, data: photos};
            }
            return {...state, }
        }
        case PhotoActionTypes.GET_PHOTOS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case PhotoActionTypes.GET_PHOTOS_SUCCEEDED: {
            return {...state, data: action.payload, isBusy: false};
        }
        case PhotoActionTypes.GET_PHOTOS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case PhotoActionTypes.SAVE_PHOTO_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case PhotoActionTypes.SAVE_PHOTO_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case PhotoActionTypes.SAVE_PHOTO_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
