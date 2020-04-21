import { Action, Reducer } from "redux";

import { AwardActionTypes } from "./AwardActions";
import { Award, AwardWinner } from "../models/Events";

export interface IAwardState {
    data: Map<string, Award>;
}

export const defaultState: IAwardState = {
    data: new Map(),
};

export interface IAwardWinnerAppend extends Action {
    type: AwardActionTypes.APPEND_AWARD_WINNER;
    payload: string;
}

export interface IAwardWinnerCancel extends Action {
    type: AwardActionTypes.CANCEL_AWARD_WINNER;
    payload: string;
}

export interface IAwardGetSucceeded extends Action {
    type: AwardActionTypes.GET_AWARD_SUCCEEDED;
    payload: Award;
}

type KnownActions = 
    | IAwardWinnerAppend
    | IAwardWinnerCancel
    | IAwardGetSucceeded;

export const AwardReducer: Reducer<IAwardState, KnownActions> = (
    state: IAwardState | undefined,
    action: KnownActions
): IAwardState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case AwardActionTypes.APPEND_AWARD_WINNER: {
            const awardMap = state.data;
            const award = awardMap.get(action.payload) || new Award({});
            const winners = award.winners.slice(0);
            winners.unshift(new AwardWinner({ id: 0 }));
            award.winners = winners;
            awardMap.set(action.payload, award);
            return { ...state, data: awardMap };
        }
        case AwardActionTypes.CANCEL_AWARD_WINNER: {
            const awardMap = state.data;
            const award = awardMap.get(action.payload) || new Award({});
            const winners = award.winners.slice(0);
            const idx = winners.findIndex(w => w.id === 0);
            if (idx > -1) {
                winners.splice(idx, 1);
                award.winners = winners;
                awardMap.set(action.payload, award);
                return { ...state, data: awardMap };
            }
            return { ...state };
        }
        case AwardActionTypes.GET_AWARD_SUCCEEDED: {
            const award = action.payload
            const key = award.name;
            if (key) {
                const awardMap = state.data;
                awardMap.set(key, action.payload);
                return {...state, data: awardMap };
            }
            return { ...state };
        }
        default:
            return state;
    }
};
