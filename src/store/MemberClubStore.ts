import { Action, Reducer } from 'redux';

import { IClub, Club, Membership, ClubContact } from '../models/Clubs';
import { MemberClubActionTypes } from './MemberClubActions';
import { IContactData } from '../features/contacts/ContactApi';

export interface IMemberClubState {
    clubs: IClub[];
    selectedClub: Club;
    mostRecentMembership?: Membership;
    isBusy: boolean;
    hasError: boolean;
}

export const defaultState: IMemberClubState = {
    clubs: [],
    selectedClub: new Club({}),
    isBusy: false,
    hasError: false,
};

export interface ILoadMemberClubsRequested extends Action {
    type: MemberClubActionTypes.LOAD_CLUBS_REQUESTED;
}

export interface ILoadMemberClubsSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_CLUBS_SUCCEEDED;
    payload: IClub[];
}

export interface ILoadMemberClubsFailed extends Action {
    type: MemberClubActionTypes.LOAD_CLUBS_FAILED;
}

export interface ILoadMembershipsSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED;
    payload: IClub[];
}

export interface IGetMemberClubRequested extends Action {
    type: MemberClubActionTypes.GET_CLUB_REQUESTED;
}

export interface IGetMemberClubSucceeded extends Action {
    type: MemberClubActionTypes.GET_CLUB_SUCCEEDED;
    payload: Club;
}

export interface IGetMemberClubFailed extends Action {
    type: MemberClubActionTypes.GET_CLUB_FAILED;
}

export interface ILoadMembershipSucceeded extends Action {
    type: MemberClubActionTypes.LOAD_MEMBERSHIP_SUCCEEDED;
    payload: Membership;
}

export interface ISaveMemberClubRequested extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_REQUESTED;
}

export interface ISaveMemberClubSucceeded extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_SUCCEEDED;
}

export interface ISaveMemberClubFailed extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_FAILED;
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

export interface IClubContactSaveRequested extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_CONTACT_REQUESTED;
}

export interface IClubContactSaveSucceeded extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_CONTACT_SUCCEEDED;
}

export interface IClubContactSaveFailed extends Action {
    type: MemberClubActionTypes.SAVE_CLUB_CONTACT_FAILED;
}

type KnownActions = ILoadMemberClubsRequested 
    | ILoadMemberClubsSucceeded
    | ILoadMemberClubsFailed 
    | ILoadMembershipsSucceeded
    | IGetMemberClubRequested
    | IGetMemberClubSucceeded
    | IGetMemberClubFailed
    | ILoadMembershipSucceeded
    | ISaveMemberClubRequested
    | ISaveMemberClubSucceeded
    | ISaveMemberClubFailed
    | IClubContactAdd
    | IClubContactAppend
    | IClubContactCancel
    | IClubContactSaveRequested
    | IClubContactSaveSucceeded
    | IClubContactSaveFailed;

export const MemberClubsReducer: Reducer<IMemberClubState, KnownActions> =
    (state: IMemberClubState = defaultState, action: KnownActions): IMemberClubState => {

    switch (action.type) {
        case MemberClubActionTypes.LOAD_CLUBS_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case MemberClubActionTypes.LOAD_CLUBS_SUCCEEDED: {
            return {...state, clubs: action.payload, isBusy: false};
        }
        case MemberClubActionTypes.LOAD_CLUBS_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case MemberClubActionTypes.LOAD_MEMBERSHIPS_SUCCEEDED: {
            return {...state, clubs: action.payload};
        }
        case MemberClubActionTypes.GET_CLUB_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case MemberClubActionTypes.GET_CLUB_SUCCEEDED: {
            return {...state, selectedClub: action.payload, isBusy: false};
        }
        case MemberClubActionTypes.GET_CLUB_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case MemberClubActionTypes.LOAD_MEMBERSHIP_SUCCEEDED: {
            return {...state, mostRecentMembership: action.payload};
        }
        case MemberClubActionTypes.SAVE_CLUB_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case MemberClubActionTypes.SAVE_CLUB_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case MemberClubActionTypes.SAVE_CLUB_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        case MemberClubActionTypes.ADD_CLUB_CONTACT: {
            const club = state.selectedClub;
            club.addContact(action.payload);
            return {...state, selectedClub: club }
        }
        case MemberClubActionTypes.APPEND_CLUB_CONTACT: {
            const club = state.selectedClub;
            const clubContacts = club.clubContacts.slice(0);
            clubContacts.unshift(new ClubContact({id: 0, contact: {}}));
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
        case MemberClubActionTypes.SAVE_CLUB_CONTACT_REQUESTED: {
            return {...state, isBusy: true, hasError: false};
        }
        case MemberClubActionTypes.SAVE_CLUB_CONTACT_SUCCEEDED: {
            return {...state, isBusy: false};
        }
        case MemberClubActionTypes.SAVE_CLUB_CONTACT_FAILED: {
            return {...state, isBusy: false, hasError: true};
        }
        default:
            return state;
    }
}
