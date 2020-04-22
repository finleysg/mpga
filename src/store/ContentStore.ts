import { Action, Reducer } from "redux";

import { PageContent, Policy } from "../models/Policies";
import { ContentActionTypes } from "./ContentActions";

export interface IContentState {
    policies: Map<string, Policy[]>;
    pages: Map<string, PageContent>;
}

export const defaultState: IContentState = {
    policies: new Map([]),
    pages: new Map([]),
};

export interface IPolicyAppend extends Action {
    type: ContentActionTypes.APPEND_POLICY;
    payload: string;
}

export interface IPolicyCancel extends Action {
    type: ContentActionTypes.CANCEL_NEW_POLICY;
    payload: string;
}

export interface IPoliciesGetSucceeded extends Action {
    type: ContentActionTypes.GET_POLICIES_SUCCEEDED;
    payload: Policy[];
}

export interface IPageGetSucceeded extends Action {
    type: ContentActionTypes.GET_PAGE_SUCCEEDED;
    payload: PageContent;
}

type KnownActions = IPolicyAppend | IPolicyCancel | IPoliciesGetSucceeded | IPageGetSucceeded;

export const ContentReducer: Reducer<IContentState, KnownActions> = (
    state: IContentState | undefined,
    action: KnownActions
): IContentState => {
    if (!state) {
        state = { ...defaultState };
    }

    switch (action.type) {
        case ContentActionTypes.APPEND_POLICY: {
            const policies = state.policies;
            const policySet = policies?.get(action.payload) || [];
            policySet.push(
                new Policy({
                    id: 0,
                    policyType: action.payload,
                    title: "",
                    description: "",
                })
            );
            policies.set(action.payload, policySet);
            return { ...state, policies: policies };
        }
        case ContentActionTypes.CANCEL_NEW_POLICY: {
            const policies = state.policies;
            const policySet = policies?.get(action.payload) || [];
            const idx = policySet.findIndex((p) => p.id === 0);
            if (idx && idx >= 0) {
                policySet.splice(idx, 1);
                policies.set(action.payload, policySet);
                return { ...state, policies: policies };
            }
            return { ...state };
        }
        case ContentActionTypes.GET_POLICIES_SUCCEEDED: {
            const key = action.payload[0] && action.payload[0].policyType;
            if (key) {
                const policies = state.policies;
                policies.set(key, action.payload);
                return { ...state, policies: policies };
            }
            return { ...state };
        }
        case ContentActionTypes.GET_PAGE_SUCCEEDED: {
            const key = action.payload?.pageType;
            if (key) {
                const pages = state.pages;
                pages.set(key, action.payload);
                return { ...state, pages: pages };
            }
            return { ...state };
        }
        default:
            return state;
    }
};
