import { Api } from '../http';
import { Policy, PageContent } from '../models/Policies';
import NotificationActions from './NotificationActions';

export enum ContentActionTypes {
    APPEND_POLICY = "APPEND_POLICY",
    CANCEL_NEW_POLICY = "CANCEL_NEW_POLICY",
    PREVIEW_POLICY = "PREVIEW_POLICY",
    GET_POLICIES_REQUESTED = "GET_POLICIES_REQUESTED",
    GET_POLICIES_SUCCEEDED = "GET_POLICIES_SUCCEEDED",
    GET_POLICIES_FAILED = "GET_POLICIES_FAILED",
    SAVE_POLICY_REQUESTED = "SAVE_POLICY_REQUESTED",
    SAVE_POLICY_SUCCEEDED = "SAVE_POLICY_SUCCEEDED",
    SAVE_POLICY_FAILED = "SAVE_POLICY_FAILED",
    PREVIEW_PAGE = "PREVIEW_PAGE",
    GET_PAGE_REQUESTED = "GET_PAGE_REQUESTED",
    GET_PAGE_SUCCEEDED = "GET_PAGE_SUCCEEDED",
    GET_PAGE_FAILED = "GET_PAGE_FAILED",
    SAVE_PAGE_REQUESTED = "SAVE_PAGE_REQUESTED",
    SAVE_PAGE_SUCCEEDED = "SAVE_PAGE_SUCCEEDED",
    SAVE_PAGE_FAILED = "SAVE_PAGE_FAILED",
};

const policyUrl = "/policies/";
const pageUrl = "/pages/";

const ContentActions = {
    AddNew: () => (dispatch: any) => {
        dispatch({type: ContentActionTypes.APPEND_POLICY});
    },

    CancelNew: () => (dispatch: any) => {
        dispatch({type: ContentActionTypes.CANCEL_NEW_POLICY});
    },

    PreviewPolicy: () => (dispatch: any) => {
        dispatch({type: ContentActionTypes.PREVIEW_POLICY});
    },

    LoadPolicies: (policyType: string) => async (dispatch: any) => {
        dispatch({ type: ContentActionTypes.GET_POLICIES_REQUESTED});
        try {
            const result = await Api.get(policyUrl + "?type=" + policyType);
            const data = result.data.map((json: any) => new Policy().fromJson(json));
            dispatch({ type: ContentActionTypes.GET_POLICIES_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: ContentActionTypes.GET_POLICIES_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    SavePolicy: (policy: Policy) => async (dispatch: any) => {
        dispatch({ type: ContentActionTypes.SAVE_POLICY_REQUESTED});
        try {
            const payload = policy.prepJson();
            if (!policy.id) {
                await Api.post(policyUrl, payload);
            } else {
                await Api.put(`${policyUrl}${policy.id}/`, payload);
            }
            dispatch({ type: ContentActionTypes.SAVE_POLICY_SUCCEEDED });
            dispatch(ContentActions.LoadPolicies(policy.policyType));
            dispatch(NotificationActions.ToastSuccess(`${policy.title} has been saved.`))
        } catch (error) {
            dispatch({ type: ContentActionTypes.SAVE_POLICY_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    PreviewPageContent: () => (dispatch: any) => {
        dispatch({type: ContentActionTypes.PREVIEW_PAGE});
    },

    LoadPageContent: (pageType: string) => async (dispatch: any) => {
        dispatch({ type: ContentActionTypes.GET_PAGE_REQUESTED});
        try {
            const result = await Api.get(pageUrl + "?page=" + pageType);
            const data = new PageContent().fromJson(result.data[0]);
            dispatch({ type: ContentActionTypes.GET_PAGE_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch({ type: ContentActionTypes.GET_PAGE_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    SavePageContent: (pageContent: PageContent) => async (dispatch: any) => {
        dispatch({ type: ContentActionTypes.SAVE_PAGE_REQUESTED});
        try {
            const payload = pageContent.prepJson();
            if (!pageContent.id) {
                await Api.post(pageUrl, payload);
            } else {
                await Api.put(`${pageUrl}${pageContent.id}/`, payload);
            }
            dispatch({ type: ContentActionTypes.SAVE_PAGE_SUCCEEDED });
            dispatch(ContentActions.LoadPageContent(pageContent.pageType));
            dispatch(NotificationActions.ToastSuccess(`${pageContent.title} has been saved.`))
        } catch (error) {
            dispatch({ type: ContentActionTypes.SAVE_PAGE_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default ContentActions;
