import constants from "../constants";
import { Api } from "../http";
import { MatchResult, Team } from "../models/Clubs";
import { IApplicationState } from "./";
import AppActions from "./AppActions";
import NotificationActions from "./NotificationActions";

export const MatchPlayResultForm: string = "match-play-result";

export enum MatchPlayActionTypes {
    LOAD_TEAMS_SUCCEEDED = "LOAD_TEAMS_SUCCEEDED",
    LOAD_MATCH_RESULTS_SUCCEEDED = "LOAD_MATCH_RESULTS_SUCCEEDED",
}

const teamsUrl = "/teams/";
const resultsUrl = "/match-results/";

const MatchPlayActions = {
    LoadTeams: () => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(teamsUrl + "?year=" + constants.MatchPlayYear);
            const data = result.data.map((json: any) => new Team(json));
            dispatch(AppActions.NotBusy());
            dispatch({ type: MatchPlayActionTypes.LOAD_TEAMS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    LoadMatchResults: () => async (dispatch: any, getState: () => IApplicationState) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(resultsUrl + "?year=" + constants.MatchPlayYear);
            const data = result.data.map((json: any) => new MatchResult(json));
            dispatch(AppActions.NotBusy());
            dispatch({ type: MatchPlayActionTypes.LOAD_MATCH_RESULTS_SUCCEEDED, payload: data });
            if (getState().matchPlay.teams.length === 0) {
                dispatch(MatchPlayActions.LoadTeams());
            }
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveMatchResult: (result: MatchResult) => async (dispatch: any, getState: () => IApplicationState) => {
        dispatch(AppActions.Busy());
        try {
            const payload = result.toJson();
            const user = getState().session.user;
            payload.entered_by = user.email;
            await Api.post(resultsUrl, payload);
            dispatch(AppActions.NotBusy());
            dispatch(MatchPlayActions.LoadMatchResults());
            dispatch(NotificationActions.ToastSuccess(`Result for ${result.groupName} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default MatchPlayActions;
