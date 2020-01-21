import constants from '../constants';
import { Api } from '../http';
import { TournamentWinner, ITournamentWinnerGroup } from '../models/Events';
import NotificationActions from './NotificationActions';

export enum TournamentWinnerActionTypes {
    GET_TOURNAMENT_WINNERS_REQUESTED = "GET_TOURNAMENT_WINNERS_REQUESTED",
    GET_TOURNAMENT_WINNERS_SUCCEEDED = "GET_TOURNAMENT_WINNERS_SUCCEEDED",
    GET_TOURNAMENT_WINNERS_FAILED = "GET_TOURNAMENT_WINNERS_FAILED",
    SAVE_TOURNAMENT_WINNER_REQUESTED = "SAVE_TOURNAMENT_WINNER_REQUESTED",
    SAVE_TOURNAMENT_WINNER_SUCCEEDED = "SAVE_TOURNAMENT_WINNER_SUCCEEDED",
    SAVE_TOURNAMENT_WINNER_FAILED = "SAVE_TOURNAMENT_WINNER_FAILED",
};

const tournamentWinnerUrl = constants.ApiUrl + "/tournament-winners/";

const TournamentWinnerActions = {
    LoadTournamentWinners: (name: string) => async (dispatch: any) => {
        dispatch({ type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_REQUESTED});
        try {
            const result = await Api.get(`${tournamentWinnerUrl}?name=${name}`);
            const data = result.data.map((json: any) => new TournamentWinner(json));
            const grouped = data.reduce((acc: ITournamentWinnerGroup[], item: TournamentWinner) => {
                const group = acc.find(g => g.year === item.year);
                if (group) {
                    group.winners.push(item);
                } else {
                    acc.push({
                        year: item.year,
                        location: item.location,
                        winners: [item],
                    });
                }
                return acc;
            }, []);
            dispatch({ type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED, payload: grouped });
        } catch (error) {
            dispatch({ type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournamentWinner: (winner: TournamentWinner) => async (dispatch: any) => {
        dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_REQUESTED});
        try {
            const payload = winner.prepJson();
            if (!winner.id) {
                await Api.post(tournamentWinnerUrl, payload);
            } else {
                await Api.put(`${tournamentWinnerUrl}${winner.id}/`, payload);
            }
            dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_SUCCEEDED });
            // dispatch(TournamentActions.LoadTournaments());
            dispatch(NotificationActions.ToastSuccess("Tournament winner has been saved."))
        } catch (error) {
            dispatch({ type: TournamentWinnerActionTypes.SAVE_TOURNAMENT_WINNER_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default TournamentWinnerActions;
