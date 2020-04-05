import cloneDeep from "lodash/cloneDeep";
import { Action, Reducer } from "redux";

import { ITournamentHistorySearch } from "../features/tournaments/TournamentHistorySearch";
import { ITournamentWinnerGroup, Tournament, TournamentWinner } from "../models/Events";
import { TournamentWinnerActionTypes } from "./TournamentWinnerActions";

export interface ITournamentWinnerState {
    groups: ITournamentWinnerGroup[];
    filteredGroups: ITournamentWinnerGroup[];
}

export const defaultState: ITournamentWinnerState = {
    groups: [],
    filteredGroups: [],
};

export interface ITournamentWinnersGetSucceeded extends Action {
    type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED;
    payload: ITournamentWinnerGroup[];
}

export interface ITournamentWinnerAppendNew extends Action {
    type: TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER;
    payload: { tournament: Tournament; year: number; location: string };
}

export interface ITournamentWinnerCancelNew extends Action {
    type: TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER;
}

export interface ITournamentWinnerSearch extends Action {
    type: TournamentWinnerActionTypes.SEARCH_TOURNAMENT_WINNERS;
    payload: ITournamentHistorySearch;
}

type KnownActions =
    | ITournamentWinnersGetSucceeded
    | ITournamentWinnerAppendNew
    | ITournamentWinnerCancelNew
    | ITournamentWinnerSearch;

export const TournamentWinnersReducer: Reducer<ITournamentWinnerState, KnownActions> = (
    state: ITournamentWinnerState = defaultState,
    action: KnownActions
): ITournamentWinnerState => {
    switch (action.type) {
        case TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED: {
            return {
                ...state,
                groups: action.payload,
                filteredGroups: action.payload,
            };
        }
        case TournamentWinnerActionTypes.SEARCH_TOURNAMENT_WINNERS: {
            const search = action.payload;
            let groups = cloneDeep(state.groups);
            if (search.year) {
                groups = groups.filter((g) => g.year === search.year);
            }
            if (search.location) {
                groups = groups.filter((g) => g.location.toLowerCase().indexOf(search.location!.toLowerCase()) >= 0);
            }
            if (search.division) {
                groups.forEach((g) => {
                    g.winners = [
                        ...g.winners.filter(
                            (w) => w.flightOrDivision.toLowerCase().indexOf(search.division!.toLowerCase()) >= 0
                        ),
                    ];
                });
            }
            if (search.team) {
                groups.forEach((g) => {
                    g.winners = [
                        ...g.winners.filter(
                            (w) =>
                                w.winner?.toLowerCase().indexOf(search.team!.toLowerCase()) >= 0 ||
                                (w.coWinner !== undefined &&
                                    w.coWinner.toLowerCase().indexOf(search.team!.toLowerCase()) >= 0)
                        ),
                    ];
                });
            }
            return {
                ...state,
                filteredGroups: groups.filter((g) => g.winners.length > 0),
            };
        }
        case TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER: {
            const winner = new TournamentWinner({
                id: 0,
                tournament: action.payload.tournament.id,
                year: action.payload.year,
                location: action.payload.location,
            });
            const winnerGroups = state.groups.slice(0);
            let group = winnerGroups.find(
                (w) => w.year === action.payload.year && w.location === action.payload.location
            );
            if (!group) {
                group = {
                    tournament: action.payload.tournament,
                    year: action.payload.year,
                    location: action.payload.location,
                    winners: [],
                } as ITournamentWinnerGroup;
                winnerGroups.unshift(group);
            }
            group.winners.push(winner);
            return { ...state, groups: winnerGroups };
        }
        case TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER: {
            const winnerGroups = state.groups.slice(0);
            state.groups.forEach((group, gIndex) => {
                group.winners.forEach((winner, wIndex) => {
                    if (winner.id === 0) {
                        winnerGroups[gIndex].winners.splice(wIndex, 1);
                    }
                });
            });
            return { ...state, groups: winnerGroups };
        }
        default:
            return state;
    }
};
