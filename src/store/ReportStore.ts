import { Action, Reducer } from 'redux';

import { ClubContact, Contact, Team, Membership, Club } from "../models/Clubs";
import { ReportActionTypes } from './ReportActions';

export interface IReportState {
    clubs: Club[];
    memberClubs: Club[];
    contacts: Contact[];
    clubContacts: ClubContact[];
    teams: Team[];
}

export const defaultState: IReportState = {
    clubs: [],
    memberClubs: [],
    contacts: [],
    clubContacts: [],
    teams: [],
};

export interface IGetClubsSucceeded extends Action {
    type: ReportActionTypes.GET_CLUBS_SUCCEEDED;
    payload: Club[];
}

export interface IGetMembershipsSucceeded extends Action {
    type: ReportActionTypes.GET_MEMBERSHIPS_SUCCEEDED;
    payload: { clubs: Club[], members: Membership[] };
}

export interface IGetClubContactsSucceeded extends Action {
    type: ReportActionTypes.GET_CLUB_CONTACTS_SUCCEEDED;
    payload: { clubs: Club[], contacts: ClubContact[] };
}

export interface IGetContactsSucceeded extends Action {
    type: ReportActionTypes.GET_CONTACTS_SUCCEEDED;
    payload: Contact[];
}

export interface IGetTeamsSucceeded extends Action {
    type: ReportActionTypes.GET_TEAMS_SUCCEEDED;
    payload: { year: number, teams: Team[] };
}

type KnownActions =  
    | IGetClubsSucceeded
    | IGetMembershipsSucceeded
    | IGetClubContactsSucceeded
    | IGetContactsSucceeded
    | IGetTeamsSucceeded;

export const ReportsReducer: Reducer<IReportState, KnownActions> =
    (state: IReportState = defaultState, action: KnownActions): IReportState => {

    switch (action.type) {
        case ReportActionTypes.GET_CLUBS_SUCCEEDED: {
            return {...state, clubs: action.payload};
        }
        case ReportActionTypes.GET_MEMBERSHIPS_SUCCEEDED: {
            const clubs = action.payload.clubs;
            const members = action.payload.members.map((m: Membership) => {
                const club = clubs.find((club: Club) => club.id === m.club)!;
                club.membershipData = m;
                return club;
            });
            return {...state, clubs: clubs, memberClubs: members};
        }
        case ReportActionTypes.GET_CLUB_CONTACTS_SUCCEEDED: {
            const contacts = action.payload.contacts;
            const clubs = action.payload.clubs.map((club: Club) => {
                club.clubContacts = contacts.filter((cc: ClubContact) => cc.club === club.id)
                return club;
            });       
            return {...state, clubs: clubs, clubContacts: action.payload.contacts};
        }
        case ReportActionTypes.GET_CONTACTS_SUCCEEDED: {
            return {...state, contacts: action.payload};
        }
        case ReportActionTypes.GET_TEAMS_SUCCEEDED: {
            return {...state, teams: action.payload.teams }
        }
        default:
            return state;
    }
}
