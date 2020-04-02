import constants from "../constants";
import { IContactData } from "../features/contacts/ContactApi";
import { Api } from "../http";
import { ExecutiveCommittee } from "../models/Clubs";
import AppActions from "./AppActions";
import NotificationActions from "./NotificationActions";

export enum CommitteeActionTypes {
    ADD_COMMITTEE_MEMBER = "ADD_COMMITTEE_MEMBER",
    APPEND_COMMITTEE_MEMBER = "APPEND_COMMITTEE_MEMBER",
    CANCEL_NEW_COMMITTEE_MEMBER = "CANCEL_NEW_COMMITTEE_MEMBER",
    LOAD_COMMITTEE_SUCCEEDED = "LOAD_COMMITTEE_SUCCEEDED",
}

const committeeUrl = constants.ApiUrl + "/committee/";

const CommitteeActions = {
    AddNewMember: (contact: IContactData) => (dispatch: any) => {
        dispatch({ type: CommitteeActionTypes.ADD_COMMITTEE_MEMBER, payload: contact });
    },
    AppendNewMember: () => (dispatch: any) => {
        dispatch({ type: CommitteeActionTypes.APPEND_COMMITTEE_MEMBER });
    },
    CancelNewMember: () => (dispatch: any) => {
        dispatch({ type: CommitteeActionTypes.CANCEL_NEW_COMMITTEE_MEMBER });
    },
    LoadCommittee: () => async (dispatch: any) => {
        try {
            const result = await Api.get(committeeUrl);
            const data = result.data.map((t: any) => new ExecutiveCommittee(t));
            dispatch({ type: CommitteeActionTypes.LOAD_COMMITTEE_SUCCEEDED, payload: data });
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveCommitteeMember: (member: ExecutiveCommittee) => async (dispatch: any) => {
        dispatch(AppActions.NotBusy());
        try {
            const payload = member.toJson();
            if (!member.id) {
                await Api.post(committeeUrl, payload);
            } else {
                await Api.put(`${committeeUrl}${member.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(CommitteeActions.LoadCommittee());
            dispatch(NotificationActions.ToastSuccess(`${member.contact.name} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    DeleteCommitteeMember: (member: ExecutiveCommittee) => async (dispatch: any) => {
        dispatch(AppActions.NotBusy());
        try {
            await Api.delete(`${committeeUrl}${member.id}/`);
            dispatch(AppActions.NotBusy());
            dispatch(CommitteeActions.LoadCommittee());
            dispatch(NotificationActions.ToastSuccess(`${member.contact.name} has been deleted.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default CommitteeActions;
