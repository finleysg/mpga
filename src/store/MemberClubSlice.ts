import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

import { RootState } from "../app-store";
import Constants from "../constants";
import { Api } from "../http";
import { IClub } from "../models/Clubs";
import { IClubContactData, IClubData, IContactData, IMembershipData } from "../models/Data";
import { ActionStatus } from "./Utilities";

const clubsUrl = "/clubs/";
const membershipsUrl = "/memberships/";
const clubContactsUrl = "/club-contacts/";

export interface IMemberClubState {
  clubs: IClub[];
  selectedClub?: IClubData;
  mostRecentMembership?: IMembershipData;
  status: ActionStatus;
  error?: string;
}

const defaultState: IMemberClubState = {
  clubs: [],
  status: ActionStatus.Idle,
};

const addNewClubContact = createAction<IContactData>("clubContact/add");
const createNewClubContact = createAction<void>("clubContact/create");
const cancelNewClubContact = createAction<void>("clubContact/cancel");

const loadMemberClubs = createAsyncThunk<
  { clubs: IClubData[]; memberships: IMembershipData[] },
  void,
  { state: RootState }
>("members/load", async () => {
  const requests = [Api.get(clubsUrl), Api.get(membershipsUrl + "?year=" + Constants.MemberClubYear)];
  const responses = await axios.all(requests);
  return {
    clubs: responses[0].data as IClubData[],
    memberships: responses[1].data as IMembershipData[],
  };
});

const getMemberClub = createAsyncThunk<IClubData, string, { state: RootState }>("member/get", async (systemName) => {
  const response = await Api.get(clubsUrl + "?name=" + systemName);
  return response.data[0] as IClubData;
});

const getMembership = createAsyncThunk<IMembershipData, number, { state: RootState }>(
  "membership/get",
  async (clubId) => {
    const response = await Api.get(membershipsUrl + "?club=" + clubId.toString());
    const memberships = response.data as IMembershipData[];
    return memberships?.shift();
  },
);

const saveMemberClub = createAsyncThunk<void, IClubData, { state: RootState }>("member/save", async (clubData) => {
  await Api.put(`${clubsUrl}${clubData.id}/`, clubData);
});

const createMembership = createAsyncThunk<void, IMembershipData, { state: RootState }>(
  "membership/create",
  async (membershipData) => {
    await Api.post(membershipsUrl, membershipData);
  },
);

const saveClubContact = createAsyncThunk<void, IClubContactData, { state: RootState }>(
  "clubContact/save",
  async (clubContactData) => {
    if (!clubContactData.id) {
      await Api.post(clubContactsUrl, clubContactData);
    } else {
      await Api.put(`${clubContactsUrl}${clubContactData.id}/`, clubContactData);
    }
  },
);

const removeClubContact = createAsyncThunk<void, number>("clubContact/remove", async (clubContactId) => {
  await Api.delete(`${clubContactsUrl}${clubContactId}/`);
});

const memberClubSlice = createSlice({
  name: "members",
  initialState: defaultState,
  reducers: {
    addNewClubContact(state, action: PayloadAction<IContactData>) {
      const club = state.selectedClub;
      const clubContacts = club.club_contacts.slice(0);
      const newClubContact = { id: 0 } as IClubContactData;
      newClubContact.contact = action.payload;
      newClubContact.club = club.id;
      clubContacts.unshift(newClubContact);
      club.club_contacts = clubContacts;
      state.selectedClub = club;
    },
    createNewClubContact(state) {
      const club = state.selectedClub;
      const clubContacts = club.club_contacts.slice(0);
      const newClubContact = { id: 0 } as IClubContactData;
      newClubContact.contact = { id: 0 } as IContactData;
      newClubContact.club = club.id;
      clubContacts.unshift(newClubContact);
      club.club_contacts = clubContacts;
      state.selectedClub = club;
    },
    cancelNewClubContact(state) {
      const idx = state.selectedClub.club_contacts.findIndex((cc) => cc.id === 0);
      if (idx >= 0) {
        const club = state.selectedClub;
        club.club_contacts.splice(idx, 1);
        state.selectedClub = club;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMemberClubs.fulfilled, (state, action) => {
        state.clubs = action.payload.clubs.map((club) => {
          const isCurrent =
            action.payload.memberships.findIndex((m) => m.club === club.id && m.year === Constants.MemberClubYear) >= 0;
          return {
            id: club.id,
            name: club.name,
            systemName: club.system_name,
            isCurrent: isCurrent,
            website: club.website,
            location: club.golf_course?.name || "unaffiliated",
            size: club.size,
          } as IClub;
        });
      })
      .addCase(getMemberClub.fulfilled, (state, action) => {
        state.selectedClub = action.payload;
      })
      .addCase(getMembership.fulfilled, (state, action) => {
        state.mostRecentMembership = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = "";
          state.status = ActionStatus.Busy;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.error = "";
          state.status = ActionStatus.Idle;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message;
          state.status = ActionStatus.Error;
        },
      );
  },
});

export {
  addNewClubContact,
  cancelNewClubContact,
  createMembership,
  createNewClubContact as appendNewClubContact,
  getMemberClub,
  getMembership,
  loadMemberClubs,
  memberClubSlice,
  removeClubContact,
  saveClubContact,
  saveMemberClub,
};
