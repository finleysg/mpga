import constants from '../constants';
import { Api } from '../http';
import { Tournament } from '../models/Events';
import NotificationActions from './NotificationActions';
import TournamentWinnerActions from './TournamentWinnerActions';
import AppActions from './AppActions';
import DocumentActions from "./DocumentActions";

export const TournamentDetailForm: string = "tournament-detail";

export enum TournamentActionTypes {
    GET_TOURNAMENT_SUCCEEDED = "GET_TOURNAMENT_SUCCEEDED",
    GET_TOURNAMENTS_SUCCEEDED = "GET_TOURNAMENTS_SUCCEEDED",
};

const tournamentUrl = constants.ApiUrl + "/tournaments/";

const TournamentActions = {
    LoadTournaments: () => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(tournamentUrl);
            if (result && result.data) {
                const data = result.data.map((t: any) => new Tournament(t));
                dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED, payload: data });
            }
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    LoadTournament: (name: string, loadRelatedDocuments: boolean = false) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(`${tournamentUrl}?name=${name}`);
            if (result && result.data) {
                const data = new Tournament(result.data[0]);
                dispatch(TournamentWinnerActions.LoadTournamentWinners(data));
                dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED, payload: data });
                if (loadRelatedDocuments) {
                    dispatch(DocumentActions.Load({
                        key: `${name}-results`,
                        documentTypes: ["Results"],
                        tournamentId: data.id,
                    }));
                }
            }
            dispatch(AppActions.NotBusy());
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournament: (tournament: Tournament) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = tournament.prepJson();
            if (!tournament.id) {
                await Api.post(tournamentUrl, payload);
            } else {
                await Api.put(`${tournamentUrl}${tournament.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(TournamentActions.LoadTournaments());
            dispatch(NotificationActions.ToastSuccess(`${tournament.name} has been saved.`))
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default TournamentActions;
