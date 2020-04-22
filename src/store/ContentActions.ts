import { Api } from '../http';
import { Policy, PageContent } from '../models/Policies';
import NotificationActions from './NotificationActions';
import AppActions from './AppActions';

export const PageContentForm: string = "page-content";
export const PolicyForm: string = "policy";

export enum ContentActionTypes {
    APPEND_POLICY = "APPEND_POLICY",
    CANCEL_NEW_POLICY = "CANCEL_NEW_POLICY",
    GET_POLICIES_SUCCEEDED = "GET_POLICIES_SUCCEEDED",
    GET_PAGE_SUCCEEDED = "GET_PAGE_SUCCEEDED",
};

const policyUrl = "/policies/";
const pageUrl = "/pages/";

const ContentActions = {
    AddNewPolicy: (policyCode: string) => (dispatch: any) => {
        dispatch({type: ContentActionTypes.APPEND_POLICY, payload: policyCode});
    },

    CancelNewPolicy: (policyCode: string) => (dispatch: any) => {
        dispatch({type: ContentActionTypes.CANCEL_NEW_POLICY, payload: policyCode});
    },

    LoadPolicies: (policyType: string) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(policyUrl + "?type=" + policyType);
            const data = result.data.map((json: any) => new Policy(json));
            dispatch(AppActions.NotBusy());
            dispatch({ type: ContentActionTypes.GET_POLICIES_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    SavePolicy: (policy: Policy) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = policy.prepJson();
            if (!policy.id) {
                await Api.post(policyUrl, payload);
            } else {
                await Api.put(`${policyUrl}${policy.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(PolicyForm));
            dispatch(ContentActions.LoadPolicies(policy.policyType));
            dispatch(NotificationActions.ToastSuccess(`${policy.title} has been saved.`))
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    DeletePolicy: (policy: Policy) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            await Api.delete(`${policyUrl}${policy.id}/`);
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(PolicyForm));
            dispatch(ContentActions.LoadPolicies(policy.policyType));
            dispatch(NotificationActions.ToastSuccess(`${policy.title} has been deleted.`))
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    LoadPageContent: (pageType: string) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(pageUrl + "?page=" + pageType);
            const data = new PageContent(result.data[0]);
            dispatch(AppActions.NotBusy());
            dispatch({ type: ContentActionTypes.GET_PAGE_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    SavePageContent: (pageContent: PageContent) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = pageContent.prepJson();
            if (!pageContent.id) {
                await Api.post(pageUrl, payload);
            } else {
                await Api.put(`${pageUrl}${pageContent.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(PageContentForm));
            dispatch(ContentActions.LoadPageContent(pageContent.pageType));
            dispatch(NotificationActions.ToastSuccess(`${pageContent.title} has been saved.`))
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default ContentActions;
