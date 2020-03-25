import constants from '../constants';
import { Api } from '../http';
import { Tournament } from '../models/Events';
import NotificationActions from './NotificationActions';

export enum TournamentActionTypes {
    GET_TOURNAMENT_REQUESTED = "GET_TOURNAMENT_REQUESTED",
    GET_TOURNAMENT_SUCCEEDED = "GET_TOURNAMENT_SUCCEEDED",
    GET_TOURNAMENT_FAILED = "GET_TOURNAMENT_FAILED",
    GET_TOURNAMENTS_REQUESTED = "GET_TOURNAMENTS_REQUESTED",
    GET_TOURNAMENTS_SUCCEEDED = "GET_TOURNAMENTS_SUCCEEDED",
    GET_TOURNAMENTS_FAILED = "GET_TOURNAMENTS_FAILED",
    SAVE_TOURNAMENT_REQUESTED = "SAVE_TOURNAMENT_REQUESTED",
    SAVE_TOURNAMENT_SUCCEEDED = "SAVE_TOURNAMENT_SUCCEEDED",
    SAVE_TOURNAMENT_FAILED = "SAVE_TOURNAMENT_FAILED",
};

const tournamentUrl = constants.ApiUrl + "/tournaments/";

const TournamentActions = {
    LoadTournaments: () => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_REQUESTED});
        try {
            const result = await Api.get(tournamentUrl);
            const data = result.data.map((t: any) => new Tournament(t));
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    LoadTournament: (name: string) => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_REQUESTED});
        try {
            const result = await Api.get(`${tournamentUrl}?name=${name}`);
            const data = new Tournament(result.data[0]);
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournament: (tournament: Tournament) => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_REQUESTED});
        try {
            const payload = tournament.prepJson();
            if (!tournament.id) {
                await Api.post(tournamentUrl, payload);
            } else {
                await Api.put(`${tournamentUrl}${tournament.id}/`, payload);
            }
            dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_SUCCEEDED });
            dispatch(TournamentActions.LoadTournaments());
            dispatch(NotificationActions.ToastSuccess(`${tournament.name} has been saved.`))
        } catch (error) {
            dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default TournamentActions;
