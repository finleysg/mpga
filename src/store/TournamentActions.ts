import constants from '../constants';
import { Api } from '../http';
import { EventDetail, Tournament, TournamentWinner } from '../models/Events';
import NotificationActions from './NotificationActions';

export enum TournamentActionTypes {
    GET_EVENTS_REQUESTED = "GET_EVENTS_REQUESTED",
    GET_EVENTS_SUCCEEDED = "GET_EVENTS_SUCCEEDED",
    GET_EVENTS_FAILED = "GET_EVENTS_FAILED",
    GET_TOURNAMENTS_REQUESTED = "GET_TOURNAMENTS_REQUESTED",
    GET_TOURNAMENTS_SUCCEEDED = "GET_TOURNAMENTS_SUCCEEDED",
    GET_TOURNAMENTS_FAILED = "GET_TOURNAMENTS_FAILED",
    GET_TOURNAMENT_WINNERS_REQUESTED = "GET_TOURNAMENT_WINNERS_REQUESTED",
    GET_TOURNAMENT_WINNERS_SUCCEEDED = "GET_TOURNAMENT_WINNERS_SUCCEEDED",
    GET_TOURNAMENT_WINNERS_FAILED = "GET_TOURNAMENT_WINNERS_FAILED",
    SAVE_TOURNAMENT_REQUESTED = "SAVE_TOURNAMENT_REQUESTED",
    SAVE_TOURNAMENT_SUCCEEDED = "SAVE_TOURNAMENT_SUCCEEDED",
    SAVE_TOURNAMENT_FAILED = "SAVE_TOURNAMENT_FAILED",
    SAVE_TOURNAMENT_WINNER_REQUESTED = "SAVE_TOURNAMENT_WINNER_REQUESTED",
    SAVE_TOURNAMENT_WINNER_SUCCEEDED = "SAVE_TOURNAMENT_WINNER_SUCCEEDED",
    SAVE_TOURNAMENT_WINNER_FAILED = "SAVE_TOURNAMENT_WINNER_FAILED",
};

const eventUrl = constants.ApiUrl + "/events/";
const tournamentUrl = constants.ApiUrl + "/tournaments/";

const TournamentActions = {
    LoadEvents: () => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_EVENTS_REQUESTED});
        try {
            const result = await Api.get(eventUrl + "?year=" + constants.EventCalendarYear.toString());
            const data = result.data.map((json: any) => new EventDetail(json));
            dispatch({ type: TournamentActionTypes.GET_EVENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_EVENTS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    LoadTournaments: () => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_REQUESTED});
        try {
            const result = await Api.get(tournamentUrl);
            const data = result.data.map((json: any) => new Tournament(json));
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENTS_FAILED });
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
    },
    LoadTournamentWinners: (name: string) => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED});
        try {
            const result = await Api.get(`${tournamentUrl}/?name=${name}`);
            const data = result.data.map((json: any) => new TournamentWinner(json));
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: TournamentActionTypes.GET_TOURNAMENT_WINNERS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournamentWinner: (winner: TournamentWinner) => async (dispatch: any) => {
        dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED});
        try {
            const payload = winner.prepJson();
            if (!winner.id) {
                await Api.post(tournamentUrl, payload);
            } else {
                await Api.put(`${tournamentUrl}${winner.id}/`, payload);
            }
            dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED });
            dispatch(TournamentActions.LoadTournaments());
            dispatch(NotificationActions.ToastSuccess("Tournament winner has been saved."))
        } catch (error) {
            dispatch({ type: TournamentActionTypes.SAVE_TOURNAMENT_WINNER_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default TournamentActions;
