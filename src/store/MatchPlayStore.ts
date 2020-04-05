import { Action, Reducer } from 'redux';

import { Team, MatchResult } from '../models/Clubs';
import { MatchPlayActionTypes } from './MatchPlayActions';
import moment from 'moment';

export interface IMatchPlayState {
    teams: Team[];
    groups: string[];
    results: MatchResult[];
    matchDates: string[];
}

export const defaultState: IMatchPlayState = {
    teams: [],
    groups: [],
    results: [],
    matchDates: [],
};

export interface ILoadTeamsSucceeded extends Action {
    type: MatchPlayActionTypes.LOAD_TEAMS_SUCCEEDED;
    payload: Team[];
}

export interface ILoadMatchResultsSucceeded extends Action {
    type: MatchPlayActionTypes.LOAD_MATCH_RESULTS_SUCCEEDED;
    payload: MatchResult[];
}

type KnownActions = ILoadTeamsSucceeded | ILoadMatchResultsSucceeded;

export const MatchPlaysReducer: Reducer<IMatchPlayState, KnownActions> =
    (state: IMatchPlayState = defaultState, action: KnownActions): IMatchPlayState => {

    switch (action.type) {
        case MatchPlayActionTypes.LOAD_TEAMS_SUCCEEDED: {
            const groups = action.payload.map((t) => t.groupName);
            return {...state, teams: action.payload, groups: [...new Set(groups)]};
        }
        case MatchPlayActionTypes.LOAD_MATCH_RESULTS_SUCCEEDED: {
            const dates = action.payload.map((r) => moment(r.matchDate).format("MMM DD"))
            return {...state, results: action.payload, matchDates: [...new Set(dates)]};
        }
        default:
            return state;
    }
}
