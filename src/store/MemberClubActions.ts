import { Api } from "../http";
import { Club, ClubContact, IClub, Membership } from "../models/Clubs";
import { IApplicationState } from "./";
import NotificationActions from "./NotificationActions";
import { IClubContactData } from "../features/members/ClubContactEdit";
import { IContactData } from "../features/contacts/ContactApi";

export enum MemberClubActionTypes {
    LOAD_CLUBS_REQUESTED = "LOAD_CLUBS_REQUESTED",
    LOAD_CLUBS_SUCCEEDED = "LOAD_CLUBS_SUCCEEDED",
    LOAD_CLUBS_FAILED = "LOAD_CLUBS_FAILED",
    LOAD_MEMBERSHIPS_SUCCEEDED = "LOAD_MEMBERSHIPS_SUCCEEDED",
    LOAD_MEMBERSHIP_SUCCEEDED = "LOAD_MEMBERSHIP_SUCCEEDED",
    SAVE_CLUB_REQUESTED = "SAVE_CLUB_REQUESTED",
    SAVE_CLUB_SUCCEEDED = "SAVE_CLUB_SUCCEEDED",
    SAVE_CLUB_FAILED = "SAVE_CLUB_FAILED",
    GET_CLUB_REQUESTED = "GET_CLUB_REQUESTED",
    GET_CLUB_SUCCEEDED = "GET_CLUB_SUCCEEDED",
    GET_CLUB_FAILED = "GET_CLUB_FAILED",
    ADD_CLUB_CONTACT = "ADD_CLUB_CONTACT",
    APPEND_CLUB_CONTACT = "APPEND_CLUB_CONTACT",
    CANCEL_NEW_CLUB_CONTACT = "CANCEL_NEW_CLUB_CONTACT",
    SAVE_CLUB_CONTACT_REQUESTED = "SAVE_CLUB_CONTACT_REQUESTED",
    SAVE_CLUB_CONTACT_SUCCEEDED = "SAVE_CLUB_CONTACT_SUCCEEDED",
    SAVE_CLUB_CONTACT_FAILED = "SAVE_CLUB_CONTACT_FAILED",
};

const clubsUrl = "/clubs/";
const membershipsUrl = "/memberships/";
const clubContactsUrl = "/club-contacts/";

const MemberClubActions = {
    LoadMemberClubs: () => async (dispatch: any) => {
        dispatch({ type: MemberClubActionTypes.LOAD_CLUBS_REQUESTED});
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
            dispatch(MemberClubActions.LoadMemberships(2019))
        } catch (error) {
            dispatch({ type: MemberClubActionTypes.LOAD_CLUBS_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    LoadMemberships: (year: number) => async (dispatch: any, getState: () => IApplicationState) => {
        const result = await Api.get(membershipsUrl + "?year=" + year);
        const memberships: Membership[] = result.data.map((json: any) => new Membership(json));
        const clubs = getState().memberClubs.clubs;
        const updatedClubs = clubs.map((club: IClub) => {
            const membership = memberships.findIndex(m => m.club === club.id);
            club.isCurrent = (membership >= 0);
            return Object.assign({}, club);
        });
        dispatch({ type: MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED, payload: updatedClubs });
    },

    LoadMemberClub: (systemName: string) => async (dispatch: any) => {
        dispatch({ type: MemberClubActionTypes.GET_CLUB_REQUESTED });
        try {
            const result = await Api.get(clubsUrl + "?name=" + systemName);
            const data = new Club(result.data[0]);
            dispatch({ type: MemberClubActionTypes.GET_CLUB_SUCCEEDED, payload: data });
            dispatch(MemberClubActions.LoadMembership(data.id!));
        } catch (error) {
            dispatch({ type: MemberClubActionTypes.GET_CLUB_FAILED });
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
        dispatch({ type: MemberClubActionTypes.SAVE_CLUB_REQUESTED });
        try {
            const payload = club.prepJson();
            await Api.put(`${clubsUrl}${club.id}/`, payload);
            dispatch({ type: MemberClubActionTypes.SAVE_CLUB_SUCCEEDED });
            dispatch(MemberClubActions.LoadMemberClub(club.systemName));
            dispatch(NotificationActions.ToastSuccess(`${club.name} has been saved.`))
        } catch (error) {
            dispatch({ type: MemberClubActionTypes.SAVE_CLUB_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },

    AddNewClubContact: (contact: IContactData) => (dispatch: any) => {
        dispatch({type: MemberClubActionTypes.ADD_CLUB_CONTACT, payload: contact});
    },

    AppendNewClubContact: () => (dispatch: any) => {
        dispatch({type: MemberClubActionTypes.APPEND_CLUB_CONTACT});
    },

    CancelNewClubContact: () => (dispatch: any) => {
        dispatch({type: MemberClubActionTypes.CANCEL_NEW_CLUB_CONTACT});
    },

    SaveClubContact: (id: number, contact: IClubContactData) => async (dispatch: any, getState: () => IApplicationState) => {
        const currentClub = getState().memberClubs.selectedClub;
        dispatch({ type: MemberClubActionTypes.SAVE_CLUB_CONTACT_REQUESTED });
        try {
            const payload = {}; // contact.prepJson();
            if (!id) {
                await Api.post(clubContactsUrl, payload);
            } else {
                await Api.put(`${clubContactsUrl}${id}/`, payload);
            }
            dispatch({ type: MemberClubActionTypes.SAVE_CLUB_CONTACT_SUCCEEDED });
            dispatch(MemberClubActions.LoadMemberClub(currentClub.systemName));
            dispatch(NotificationActions.ToastSuccess(`${contact.firstName + " " + contact.lastName} has been saved.`))
        } catch (error) {
            dispatch({ type: MemberClubActionTypes.SAVE_CLUB_CONTACT_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    }
}

export default MemberClubActions;
