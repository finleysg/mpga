import { Action, Reducer } from "redux";

import { ExecutiveCommittee } from "../models/Clubs";
import { IContactData } from "../models/Data";
import { CommitteeActionTypes } from "./CommitteeActions";

export interface ICommitteeState {
  members: ExecutiveCommittee[];
}

export const defaultState: ICommitteeState = {
  members: [],
};

export interface ICommitteeMemberAdd extends Action {
  type: CommitteeActionTypes.ADD_COMMITTEE_MEMBER;
  payload: IContactData;
}

export interface ICommitteeMemberAppend extends Action {
  type: CommitteeActionTypes.APPEND_COMMITTEE_MEMBER;
  payload: string;
}

export interface ICommitteeMemberCancel extends Action {
  type: CommitteeActionTypes.CANCEL_NEW_COMMITTEE_MEMBER;
  payload: string;
}

export interface ILoadCommitteeSucceeded extends Action {
  type: CommitteeActionTypes.LOAD_COMMITTEE_SUCCEEDED;
  payload: ExecutiveCommittee[];
}

type KnownActions = ICommitteeMemberAdd | ICommitteeMemberAppend | ICommitteeMemberCancel | ILoadCommitteeSucceeded;

export const CommitteeReducer: Reducer<ICommitteeState, KnownActions> = (
  state: ICommitteeState | undefined,
  action: KnownActions,
): ICommitteeState => {
  if (!state) {
    state = { ...defaultState };
  }

  switch (action.type) {
    case CommitteeActionTypes.ADD_COMMITTEE_MEMBER: {
      const committee = state.members.slice(0);
      committee.unshift(
        new ExecutiveCommittee({
          id: 0,
          contact: action.payload,
          roles: "",
          homeClub: "",
        }),
      );
      return { ...state, members: committee };
    }
    case CommitteeActionTypes.APPEND_COMMITTEE_MEMBER: {
      const committee = state.members.slice(0);
      committee.unshift(
        new ExecutiveCommittee({
          id: 0,
          contact: { id: 0 },
          roles: "",
          homeClub: "",
        }),
      );
      return { ...state, members: committee };
    }
    case CommitteeActionTypes.CANCEL_NEW_COMMITTEE_MEMBER: {
      const committee = state.members.slice(0);
      const idx = committee.findIndex((c) => c.id === 0);
      if (idx >= 0) {
        committee.splice(idx, 1);
        return { ...state, members: committee };
      }
      return { ...state };
    }
    case CommitteeActionTypes.LOAD_COMMITTEE_SUCCEEDED: {
      return { ...state, members: action.payload };
    }
    default:
      return state;
  }
};
