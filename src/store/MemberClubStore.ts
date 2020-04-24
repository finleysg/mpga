import { Action, Reducer } from 'redux';

import { IClub, Club, Membership, ClubContact, Contact } from '../models/Clubs';
import { MemberClubActionTypes } from './MemberClubActions';
import { IContactData } from '../features/contacts/ContactApi';

export interface IMemberClubState {
    clubs: IClub[];
    selectedClub: Club;
    mostRecentMembership?: Membership;
}

export const defaultState: IMemberClubState = {
    clubs: [],
    selectedClub: new Club({}),
};

export interface ILoadMemberClubsSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_CLUBS_SUCCEEDED;
    payload: IClub[];
}

export interface ILoadMembershipsSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED;
    payload: IClub[];
}

export interface IGetMemberClubSucceeded extends Action {
    type: MemberClubActionTypes.GET_CLUB_SUCCEEDED;
    payload: Club;
}

export interface ILoadMembershipSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_MEMBERSHIP_SUCCEEDED;
    payload: Membership;
}

export interface IClubContactAdd extends Action {
    type: MemberClubActionTypes.ADD_CLUB_CONTACT;
    payload: IContactData;
}

export interface IClubContactAppend extends Action {
    type: MemberClubActionTypes.APPEND_CLUB_CONTACT;
}

export interface IClubContactCancel extends Action {
    type: MemberClubActionTypes.CANCEL_NEW_CLUB_CONTACT;
}

type KnownActions =  
    | ILoadMemberClubsSucceeded
    | ILoadMembershipsSucceeded
    | IGetMemberClubSucceeded
    | ILoadMembershipSucceeded
    | IClubContactAdd
    | IClubContactAppend
    | IClubContactCancel;

export const MemberClubsReducer: Reducer<IMemberClubState, KnownActions> =
    (state: IMemberClubState = defaultState, action: KnownActions): IMemberClubState => {

    switch (action.type) {
        case MemberClubActionTypes.LOAD_CLUBS_SUCCEEDED: {
            return {...state, clubs: action.payload};
        }
        case MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED: {
            return {...state, clubs: action.payload};
        }
        case MemberClubActionTypes.GET_CLUB_SUCCEEDED: {
            return {...state, selectedClub: action.payload};
        }
        case MemberClubActionTypes.LOAD_MEMBERSHIP_SUCCEEDED: {
            return {...state, mostRecentMembership: action.payload};
        }
        case MemberClubActionTypes.ADD_CLUB_CONTACT: {
            const club = state.selectedClub;
            const clubContacts = club.clubContacts.slice(0);
            const newClubContact = new ClubContact({id: 0});
            newClubContact.contact = new Contact(action.payload);
            newClubContact.club = club.id;
            clubContacts.unshift(newClubContact);
            club.clubContacts = clubContacts;
            return {...state, selectedClub: club }
        }
        case MemberClubActionTypes.APPEND_CLUB_CONTACT: {
            const club = state.selectedClub;
            const clubContacts = club.clubContacts.slice(0);
            const newClubContact = new ClubContact({id: 0});
            newClubContact.contact = new Contact({id: 0});
            newClubContact.club = club.id;
            clubContacts.unshift(newClubContact);
            club.clubContacts = clubContacts;
            return {...state, selectedClub: club }
        }
        case MemberClubActionTypes.CANCEL_NEW_CLUB_CONTACT: {
            const idx = state.selectedClub.clubContacts.findIndex(cc => cc.id === 0);
            if (idx >= 0) {
                const club = state.selectedClub;
                club.clubContacts.splice(idx, 1);
                return {...state, selectedClub: club};
            }
            return {...state, }
        }
        default:
            return state;
    }
}
