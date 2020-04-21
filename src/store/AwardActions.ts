import { Api } from "../http";
import { Award, AwardWinner } from '../models/Events';
import NotificationActions from "./NotificationActions";
import AppActions from "./AppActions";

export const AwardForm: string = "award";
export const AwardWinnerForm: string = "award-winner";

export enum AwardActionTypes {
    APPEND_AWARD_WINNER = "APPEND_AWARD_WINNER",
    CANCEL_AWARD_WINNER = "CANCEL_AWARD_WINNER",
    GET_AWARD_SUCCEEDED = "GET_AWARD_SUCCEEDED",
}

const url = "/awards/";
const winnerUrl = "/award-winners/";

const AwardActions = {
    AddNewAwardWinner: (awardName: string) => (dispatch: any) => {
        dispatch({ type: AwardActionTypes.APPEND_AWARD_WINNER, payload: awardName });
    },
    CancelNewAwardWinner: (awardName: string) => (dispatch: any) => {
        dispatch({ type: AwardActionTypes.CANCEL_AWARD_WINNER, payload: awardName });
        dispatch(AppActions.CloseOpenForms(AwardWinnerForm));
    },
    LoadAward: (awardName: string) => async (dispatch: any) => {
        try {
            const result = await Api.get(url + "?name=" + awardName);
            const data = new Award(result.data[0]);
            dispatch({ type: AwardActionTypes.GET_AWARD_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveAward: (award: Award) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = award.prepJson();
            if (!award.id) {
                await Api.post(url, payload);
            } else {
                await Api.put(`${url}${award.id}/`, payload);
            }
            dispatch(AwardActions.LoadAward(award.name));
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(AwardForm));
            dispatch(NotificationActions.ToastSuccess(`${award.name} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveAwardWinner: (award: Award, winner: AwardWinner) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = winner.prepJson();
            payload.award = award.id;
            if (!winner.id) {
                await Api.post(winnerUrl, payload);
            } else {
                await Api.put(`${winnerUrl}${winner.id}/`, payload);
            }
            dispatch(AwardActions.LoadAward(award.name));
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(AwardWinnerForm));
            dispatch(NotificationActions.ToastSuccess(`${winner.winner} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default AwardActions;
