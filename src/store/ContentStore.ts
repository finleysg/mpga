import { Action, Reducer } from 'redux';

import { PageContent, Policy } from '../models/Policies';
import { ContentActionTypes } from './ContentActions';

export interface IContentState {
    policies: Map<string, Policy[]>;
    pages: Map<string, PageContent>;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IContentState = {
    policies: new Map([]),
    pages: new Map([]),
    isBusy: false,
    hasError: false,
};

export interface IPolicyAppend extends Action {
    type: ContentActionTypes.APPEND_POLICY;
    payload: string;
}

export interface IPolicyCancel extends Action {
    type: ContentActionTypes.CANCEL_NEW_POLICY;
    payload: string;
}

export interface IPoliciesGetRequested extends Action {
    type: ContentActionTypes.GET_POLICIES_REQUESTED;
}

export interface IPoliciesGetSucceeded extends Action {
    type: ContentActionTypes.GET_POLICIES_SUCCEEDED;
    payload: Policy[];
}

export interface IPoliciesGetFailed extends Action {
    type: ContentActionTypes.GET_POLICIES_FAILED;
}

export interface IPolicySaveRequested extends Action {
    type: ContentActionTypes.SAVE_POLICY_REQUESTED;
}

export interface IPolicySaveSucceeded extends Action {
    type: ContentActionTypes.SAVE_POLICY_SUCCEEDED;
}

export interface IPolicySaveFailed extends Action {
    type: ContentActionTypes.SAVE_POLICY_FAILED;
}

export interface IPolicyDeleteRequested extends Action {
    type: ContentActionTypes.DELETE_POLICY_REQUESTED;
}

export interface IPolicyDeleteSucceeded extends Action {
    type: ContentActionTypes.DELETE_POLICY_SUCCEEDED;
}

export interface IPolicyDeleteFailed extends Action {
    type: ContentActionTypes.DELETE_POLICY_FAILED;
}

export interface IPagePreview extends Action {
    type: ContentActionTypes.PREVIEW_PAGE;
}

export interface IPageGetRequested extends Action {
    type: ContentActionTypes.GET_PAGE_REQUESTED;
}

export interface IPageGetSucceeded extends Action {
    type: ContentActionTypes.GET_PAGE_SUCCEEDED;
    payload: PageContent;
}

export interface IPageGetFailed extends Action {
    type: ContentActionTypes.GET_PAGE_FAILED;
}

export interface IPageSaveRequested extends Action {
    type: ContentActionTypes.SAVE_PAGE_REQUESTED;
}

export interface IPageSaveSucceeded extends Action {
    type: ContentActionTypes.SAVE_PAGE_SUCCEEDED;
}

export interface IPageSaveFailed extends Action {
    type: ContentActionTypes.SAVE_PAGE_FAILED;
}

type KnownActions = IPolicyAppend 
    | IPolicyCancel
    | IPoliciesGetRequested 
    | IPoliciesGetSucceeded 
    | IPoliciesGetFailed
    | IPolicySaveRequested
    | IPolicySaveSucceeded
    | IPolicySaveFailed
    | IPolicyDeleteRequested
    | IPolicyDeleteSucceeded
    | IPolicyDeleteFailed
    | IPagePreview
    | IPageGetRequested 
    | IPageGetSucceeded 
    | IPageGetFailed
    | IPageSaveRequested
    | IPageSaveSucceeded
    | IPageSaveFailed;

export const ContentReducer: Reducer<IContentState, KnownActions> =
    (state: IContentState | undefined, action: KnownActions): IContentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case ContentActionTypes.APPEND_POLICY: {
            const policies = state.policies;
            const policySet = policies?.get(action.payload) || [];
            policySet.push(new Policy({
                id: 0,
                policyType: action.payload,
                title: "",
                description: "",
            }));
            policies.set(action.payload, policySet)
            return {...state, policies: policies }
        }
        case ContentActionTypes.CANCEL_NEW_POLICY: {
            const policies = state.policies;
            const policySet = policies?.get(action.payload) || [];
            const idx = policySet.findIndex(p => p.id === 0);
            if (idx && idx >= 0) {
                policySet.splice(idx, 1);
                policies.set(action.payload, policySet)
                return {...state, policies: policies};
            }
            return {...state, }
        }
        case ContentActionTypes.GET_POLICIES_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case ContentActionTypes.GET_POLICIES_SUCCEEDED: {
            const key = action.payload[0] && action.payload[0].policyType;
            if (key) {
                const policies = state.policies;
                policies.set(key, action.payload);
                return {...state, policies: policies, isBusy: false};
            }
            return {...state, isBusy: false};
        }
        case ContentActionTypes.GET_POLICIES_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case ContentActionTypes.SAVE_POLICY_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case ContentActionTypes.SAVE_POLICY_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case ContentActionTypes.SAVE_POLICY_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case ContentActionTypes.DELETE_POLICY_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case ContentActionTypes.DELETE_POLICY_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case ContentActionTypes.DELETE_POLICY_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case ContentActionTypes.GET_PAGE_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case ContentActionTypes.GET_PAGE_SUCCEEDED: {
            const key = action.payload?.pageType;
            if (key) {
                const pages = state.pages;
                pages.set(key, action.payload);
                return {...state, pages: pages, isBusy: false};
            }
            return {...state, isBusy: false};
        }
        case ContentActionTypes.GET_PAGE_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case ContentActionTypes.SAVE_PAGE_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case ContentActionTypes.SAVE_PAGE_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case ContentActionTypes.SAVE_PAGE_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
