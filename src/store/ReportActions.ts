import { Api } from "../http";
import { Team } from "../models/Clubs";
import AppActions from "./AppActions";
import NotificationActions from "./NotificationActions";

export enum ReportActionTypes {
  GET_CLUBS_SUCCEEDED = "GET_CLUBS_SUCCEEDED",
  GET_MEMBERSHIPS_SUCCEEDED = "GET_MEMBERSHIPS_SUCCEEDED",
  GET_TEAMS_SUCCEEDED = "GET_TEAMS_SUCCEEDED",
  GET_CONTACTS_SUCCEEDED = "GET_CONTACTS_SUCCEEDED",
  GET_CLUB_CONTACTS_SUCCEEDED = "GET_CLUB_CONTACTS_SUCCEEDED",
}

const teamsUrl = "/teams/";

const ReportActions = {
  // GetClubs: () => async (dispatch: any) => {
  //     dispatch(AppActions.Busy());
  //     try {
  //         const result = await Api.get(clubsUrl);
  //         if (result && result.data) {
  //             const data = result.data.map((json: any) => {
  //                 return new Club(json);
  //             });
  //             dispatch({ type: ReportActionTypes.GET_CLUBS_SUCCEEDED, payload: data });
  //         }
  //         dispatch(AppActions.NotBusy());
  //     } catch (error) {
  //         dispatch(AppActions.NotBusy());
  //         dispatch(NotificationActions.ToastError(error));
  //     }
  // },

  // GetMemberships: (year: number) => async (dispatch: any, getState: () => IApplicationState) => {
  //     dispatch(AppActions.Busy());
  //     try {
  //         let clubs = getState().memberClubs.clubs;
  //         if (!clubs || clubs.length === 0) {
  //             const clubData = await Api.get(clubsUrl);
  //             if (clubData && clubData.data) {
  //                 clubs = clubData.data.map((json: any) => {
  //                     return new Club(json);
  //                 });
  //             }
  //         }
  //         const result = await Api.get(membershipsUrl + "?year=" + year);
  //         if (result && result.data) {
  //             const memberships: Membership[] = result.data.map((json: any) => new Membership(json));
  //             dispatch({ type: ReportActionTypes.GET_MEMBERSHIPS_SUCCEEDED, payload: { clubs: clubs, members: memberships }});
  //         }
  //         dispatch(AppActions.NotBusy());
  //     } catch (error) {
  //         dispatch(AppActions.NotBusy());
  //         dispatch(NotificationActions.ToastError(error));
  //     }
  // },

  // GetClubContacts: () => async (dispatch: any, getState: () => IApplicationState) => {
  //     dispatch(AppActions.Busy());
  //     try {
  //         let clubs = getState().memberClubs.clubs;
  //         if (!clubs || clubs.length === 0) {
  //             const clubData = await Api.get(clubsUrl);
  //             if (clubData && clubData.data) {
  //                 clubs = clubData.data.map((json: any) => {
  //                     return new Club(json);
  //                 });
  //             }
  //         }
  //         const result = await Api.get(clubContactsUrl);
  //         if (result && result.data) {
  //             const contacts = result.data.map((json: any) => {
  //                 return new ClubContact(json);
  //             });
  //             dispatch({ type: ReportActionTypes.GET_CLUB_CONTACTS_SUCCEEDED, payload: { clubs: clubs, contacts: contacts }});
  //         }
  //         dispatch(AppActions.NotBusy());
  //     } catch (error) {
  //         dispatch(AppActions.NotBusy());
  //         dispatch(NotificationActions.ToastError(error));
  //     }
  // },

  // GetContacts: () => async (dispatch: any) => {
  //     dispatch(AppActions.Busy());
  //     try {
  //         const result = await Api.get(contactsUrl);
  //         if (result && result.data) {
  //             const data = result.data.map((json: any) => {
  //                 return new Contact(json);
  //             });
  //             dispatch({ type: ReportActionTypes.GET_CONTACTS_SUCCEEDED, payload: data });
  //         }
  //         dispatch(AppActions.NotBusy());
  //     } catch (error) {
  //         dispatch(AppActions.NotBusy());
  //         dispatch(NotificationActions.ToastError(error));
  //     }
  // },

  GetTeams: (year: number) => async (dispatch: any) => {
    dispatch(AppActions.Busy());
    try {
      const result = await Api.get(teamsUrl + "?year=" + year);
      if (result && result.data) {
        const teams = result.data.map((json: any) => new Team(json));
        dispatch({ type: ReportActionTypes.GET_TEAMS_SUCCEEDED, payload: { year: year, teams: teams } });
      }
      dispatch(AppActions.NotBusy());
    } catch (error) {
      dispatch(AppActions.NotBusy());
      dispatch(NotificationActions.ToastError(error));
    }
  },
};

export default ReportActions;
