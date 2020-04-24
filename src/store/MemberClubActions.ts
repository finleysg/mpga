import constants from "../constants";
import { IContactData } from "../features/contacts/ContactApi";
import { IClubContactData } from "../features/members/ClubContactEdit";
import { Api } from "../http";
import { Club, ClubContact, IClub, Membership } from "../models/Clubs";
import { IApplicationState } from "./";
import NotificationActions from "./NotificationActions";
import AppActions from "./AppActions";

export const ClubForm: string = "club";
export const ClubContactForm: string = "club-contact";

export enum MemberClubActionTypes {
    LOAD_CLUBS_SUCCEEDED = "LOAD_CLUBS_SUCCEEDED",
    LOAD_MEMBERSHIPS_SUCCEEDED = "LOAD_MEMBERSHIPS_SUCCEEDED",
    LOAD_MEMBERSHIP_SUCCEEDED = "LOAD_MEMBERSHIP_SUCCEEDED",
    GET_CLUB_SUCCEEDED = "GET_CLUB_SUCCEEDED",
    ADD_CLUB_CONTACT = "ADD_CLUB_CONTACT",
    APPEND_CLUB_CONTACT = "APPEND_CLUB_CONTACT",
    CANCEL_NEW_CLUB_CONTACT = "CANCEL_NEW_CLUB_CONTACT",
}

const clubsUrl = "/clubs/";
const membershipsUrl = "/memberships/";
const clubContactsUrl = "/club-contacts/";

const MemberClubActions = {
    LoadMemberClubs: () => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(clubsUrl);
            const data = result.data.map((json: any) => {
                return {
                    id: json.id,
                    name: json.name,
                    systemName: json.system_name,
                    website: json.website || "",
                    location: json.golf_course?.city || "",
                    size: json.size,
                    isCurrent: false,
                } as IClub;
            });
            dispatch({ type: MemberClubActionTypes.LOAD_CLUBS_SUCCEEDED, payload: data });
            dispatch(AppActions.NotBusy());
            dispatch(MemberClubActions.LoadMemberships(constants.MemberClubYear));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    LoadMemberships: (year: number) => async (dispatch: any, getState: () => IApplicationState) => {
        const result = await Api.get(membershipsUrl + "?year=" + year);
        const memberships: Membership[] = result.data.map((json: any) => new Membership(json));
        const clubs = getState().memberClubs.clubs;
        const updatedClubs = clubs.map((club: IClub) => {
            const membership = memberships.findIndex((m) => m.club === club.id);
            club.isCurrent = membership >= 0;
            return Object.assign({}, club);
        });
        dispatch({ type: MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED, payload: updatedClubs });
    },

    LoadMemberClub: (systemName: string) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const result = await Api.get(clubsUrl + "?name=" + systemName);
            const data = new Club(result.data[0]);
            dispatch({ type: MemberClubActionTypes.GET_CLUB_SUCCEEDED, payload: data });
            dispatch(AppActions.NotBusy());
            dispatch(MemberClubActions.LoadMembership(data.id!));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    LoadMembership: (clubId: number) => async (dispatch: any) => {
        const result = await Api.get(membershipsUrl + "?club=" + clubId.toString());
        const memberships: Membership[] = result.data.map((json: any) => new Membership(json));
        const mostRecentMembership = memberships && memberships.length > 0 ? memberships[0] : undefined;
        dispatch({ type: MemberClubActionTypes.LOAD_MEMBERSHIP_SUCCEEDED, payload: mostRecentMembership });
    },

    SaveMemberClub: (club: Club) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = club.prepJson();
            await Api.put(`${clubsUrl}${club.id}/`, payload);
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(ClubForm));
            dispatch(MemberClubActions.LoadMemberClub(club.systemName));
            dispatch(NotificationActions.ToastSuccess(`${club.name} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    AddNewClubContact: (contact: IContactData) => (dispatch: any) => {
        dispatch({ type: MemberClubActionTypes.ADD_CLUB_CONTACT, payload: contact });
    },

    AppendNewClubContact: () => (dispatch: any) => {
        dispatch({ type: MemberClubActionTypes.APPEND_CLUB_CONTACT });
    },

    CancelNewClubContact: () => (dispatch: any) => {
        dispatch({ type: MemberClubActionTypes.CANCEL_NEW_CLUB_CONTACT });
    },

    SaveClubContact: (clubContactId: number, contact: IClubContactData) => async (
        dispatch: any,
        getState: () => IApplicationState
    ) => {
        const currentClub = getState().memberClubs.selectedClub;
        dispatch(AppActions.Busy());
        try {
            const payload = ClubContact.Create(currentClub.id!, contact).prepJson();
            if (!clubContactId) {
                await Api.post(clubContactsUrl, payload);
            } else {
                await Api.put(`${clubContactsUrl}${clubContactId}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(ClubContactForm));
            dispatch(MemberClubActions.LoadMemberClub(currentClub.systemName));
            dispatch(NotificationActions.ToastSuccess(`${contact.firstName + " " + contact.lastName} has been saved.`));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },

    RemoveClubContact: (clubContact: ClubContact) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentClub = getState().memberClubs.selectedClub;
        dispatch(AppActions.Busy());
        try {
            await Api.delete(`${clubContactsUrl}${clubContact.id}/`);
            dispatch(AppActions.NotBusy());
            dispatch(AppActions.CloseOpenForms(ClubContactForm));
            dispatch(MemberClubActions.LoadMemberClub(currentClub.systemName));
            dispatch(
                NotificationActions.ToastSuccess(
                    `${clubContact.contact?.firstName + " " + clubContact.contact?.lastName} has been removed.`
                )
            );
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default MemberClubActions;
