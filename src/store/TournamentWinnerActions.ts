import constants from '../constants';
import { Api } from '../http';
import { TournamentWinner, ITournamentWinnerGroup } from '../models/Events';
import NotificationActions from './NotificationActions';
import { IApplicationState } from '.';

export enum TournamentWinnerActionTypes {
    GET_TOURNAMENT_WINNERS_REQUESTED = "GET_TOURNAMENT_WINNERS_REQUESTED",
    GET_TOURNAMENT_WINNERS_SUCCEEDED = "GET_TOURNAMENT_WINNERS_SUCCEEDED",
    GET_TOURNAMENT_WINNERS_FAILED = "GET_TOURNAMENT_WINNERS_FAILED",
    SAVE_TOURNAMENT_WINNER_REQUESTED = "SAVE_TOURNAMENT_WINNER_REQUESTED",
    SAVE_TOURNAMENT_WINNER_SUCCEEDED = "SAVE_TOURNAMENT_WINNER_SUCCEEDED",
    SAVE_TOURNAMENT_WINNER_FAILED = "SAVE_TOURNAMENT_WINNER_FAILED",
    APPEND_NEW_TOURNAMENT_WINNER = "APPEND_NEW_TOURNAMENT_WINNER",
    CANCEL_NEW_TOURNAMENT_WINNER = "CANCEL_NEW_TOURNAMENT_WINNER",
    DELETE_TOURNAMENT_WINNER_REQUESTED = "DELETE_TOURNAMENT_WINNER_REQUESTED",
    DELETE_TOURNAMENT_WINNER_SUCCEEDED = "DELETE_TOURNAMENT_WINNER_SUCCEEDED",
    DELETE_TOURNAMENT_WINNER_FAILED = "DELETE_TOURNAMENT_WINNER_FAILED",
};

const tournamentWinnerUrl = constants.ApiUrl + "/tournament-winners/";

const TournamentWinnerActions = {
    LoadTournamentWinners: (systemName: string) => async (dispatch: any, getState: () => IApplicationState) => {
        dispatch({ type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED});
        try {
            const tournament = getState().tournament.tournament;
            const result = await Api.get(`${tournamentWinnerUrl}?name=${systemName}`);
            const data = result.data.map((json: any) => new TournamentWinner(json));
            const grouped = data.reduce((acc: ITournamentWinnerGroup[], item: TournamentWinner) => {
                const group = acc.find(g => g.year === item.year);
                if (group) {
                    group.winners.push(item);
                } else {
                    acc.push({
                        year: item.year,
                        location: item.location,
                        tournament: tournament,
                        winners: [item],
                    });
                }
                return acc;
            }, []);
            dispatch({ 
                type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED, 
                payload: {
                    winners: grouped,
                }
            });
        } catch (error) {
            dispatch({ type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournamentWinner: (winner: TournamentWinner) => async (dispatch: any, getState: () => IApplicationState) => {
        dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED});
        try {
            const tournament = getState().tournament.tournament;
            const payload = winner.prepJson();
            payload.tournament = tournament.id;
            if (winner.id === -1) {
                await Api.post(tournamentWinnerUrl, payload);
            } else {
                await Api.put(`${tournamentWinnerUrl}${winner.id}/`, payload);
            }
            dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED });
            dispatch(TournamentWinnerActions.LoadTournamentWinners(tournament.systemName));
            dispatch(NotificationActions.ToastSuccess("Tournament winner has been saved."))
        } catch (error) {
            dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    DeleteTournamentWinner: (winner: TournamentWinner) => async (dispatch: any, getState: () => IApplicationState) => {
        dispatch({ type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_REQUESTED});
        try {
            const tournament = getState().tournament.tournament;
            await Api.delete(`${tournamentWinnerUrl}${winner.id}/`);
            dispatch({ type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_SUCCEEDED });
            dispatch(TournamentWinnerActions.LoadTournamentWinners(tournament.systemName));
            dispatch(NotificationActions.ToastSuccess(`${winner.winner} has been deleted.`))
        } catch (error) {
            dispatch({ type: TournamentWinnerActionTypes.DELETE_TOURNAMENT_WINNER_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    AddNew: (year?: number, location?: string) => (dispatch: any) => {
        dispatch({
            type: TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER,
            payload: { year: year, location: location }
        });
    },
    CancelNew: () => (dispatch: any) => {
        dispatch({type: TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER});
    },
}

export default TournamentWinnerActions;
