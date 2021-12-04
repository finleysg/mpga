import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import axios from 'axios';

import { RootState } from '../app-store';
import Constants from '../constants';
import { IContactData } from '../features/contacts/ContactApi';
import { IClubContactData } from '../features/members/ClubContactEdit';
import { Api } from '../http';
import { Club, ClubContact, Contact, IClub, Membership } from '../models/Clubs';

export const ClubForm: string = "club";
export const ClubContactForm: string = "club-contact";
export const MembershipForm: string = "membership";

const clubsUrl = "/clubs/";
const membershipsUrl = "/memberships/";
const clubContactsUrl = "/club-contacts/";

export interface IMemberClubState {
  clubs: IClub[];
  selectedClub: Club;
  mostRecentMembership?: Membership;
  status: string;
  error?: string;
}

const defaultState: IMemberClubState = {
  clubs: [],
  selectedClub: new Club({}),
  status: "idle",
};

const convertPayment = (mem: Membership): any => {
  const payment = {
    year: mem.year,
    club: mem.club,
    payment_date: mem.paymentDate.toISOString().substring(0, 10),
    payment_code: mem.paymentCode,
    payment_type: mem.paymentType,
    notes: mem.notes,
  };
  return payment;
};

const addNewClubContact = createAction<IContactData>("clubContact/add");
const appendNewClubContact = createAction<void>("clubContact/append");
const cancelNewClubContact = createAction<void>("clubContact/cancel");

const loadMemberClubs = createAsyncThunk<{ clubs: IClub[]; memberships: Membership[] }, void, { state: RootState }>(
  "members/load",
  async () => {
    const requests = [Api.get(clubsUrl), Api.get(membershipsUrl + "?year=" + Constants.MemberClubYear)];
    const responses = await axios.all(requests);
    return {
      clubs: responses[0].data.map((json: any) => {
        return {
          id: json.id,
          name: json.name,
          systemName: json.system_name,
          website: json.website || "",
          location: json.golf_course?.city || "",
          size: json.size,
          isCurrent: false,
        } as IClub;
      }),
      memberships: responses[1].data.map((json: any) => new Membership(json)),
    };
  }
);

const getMemberClub = createAsyncThunk<Club, string, { state: RootState }>("member/get", async (systemName) => {
  const response = await Api.get(clubsUrl + "?name=" + systemName);
  return new Club(response.data[0]);
});

const getMembership = createAsyncThunk<Membership, number, { state: RootState }>("membership/get", async (clubId) => {
  const response = await Api.get(membershipsUrl + "?club=" + clubId.toString());
  const memberships: Membership[] = response.data.map((json: any) => new Membership(json));
  return memberships && memberships.length > 0 ? memberships[0] : undefined;
});

const saveMemberClub = createAsyncThunk<void, Club, { state: RootState }>("member/save", async (club, { dispatch }) => {
  await Api.put(`${clubsUrl}${club.id}/`, club.prepJson());
  dispatch(getMemberClub(club.systemName));
});

const createMembership = createAsyncThunk<void, Membership, { state: RootState }>(
  "membership/create",
  async (membership, { dispatch, getState }) => {
    await Api.post(membershipsUrl, convertPayment(membership));
    dispatch(getMemberClub(getState().memberClubs.selectedClub.systemName));
  }
);

const saveClubContact = createAsyncThunk<void, { clubContactId: number; contact: IClubContactData }, { state: RootState }>(
  "clubContact/save",
  async ({ clubContactId, contact }, { dispatch, getState }) => {
    const currentClub = getState().memberClubs.selectedClub;
    const payload = ClubContact.Create(currentClub.id!, contact).prepJson();
    if (!clubContactId) {
      await Api.post(clubContactsUrl, payload);
    } else {
      await Api.put(`${clubContactsUrl}${clubContactId}/`, payload);
    }
    dispatch(getMemberClub(currentClub.systemName));
  }
);

const removeClubContact = createAsyncThunk<void, ClubContact, { state: RootState }>(
  "clubContact/remove",
  async (clubContact, { dispatch, getState }) => {
    const currentClub = getState().memberClubs.selectedClub;
    await Api.delete(`${clubContactsUrl}${clubContact.id}/`);
    dispatch(getMemberClub(currentClub.systemName));
  }
);

const memberClubSlice = createSlice({
  name: "members",
  initialState: defaultState,
  reducers: {
    addNewClubContact(state, action: PayloadAction<IContactData>) {
      const club = state.selectedClub;
      const clubContacts = club.clubContacts.slice(0);
      const newClubContact = new ClubContact({ id: 0 });
      newClubContact.contact = new Contact(action.payload);
      newClubContact.club = club.id;
      clubContacts.unshift(newClubContact);
      club.clubContacts = clubContacts;
      state.selectedClub = club;
    },
    appendNewClubContact(state) {
      const club = state.selectedClub;
      const clubContacts = club.clubContacts.slice(0);
      const newClubContact = new ClubContact({ id: 0 });
      newClubContact.contact = new Contact({ id: 0 });
      newClubContact.club = club.id;
      clubContacts.unshift(newClubContact);
      club.clubContacts = clubContacts;
      state.selectedClub = club;
    },
    cancelNewClubContact(state) {
      const idx = state.selectedClub.clubContacts.findIndex((cc) => cc.id === 0);
      if (idx >= 0) {
        const club = state.selectedClub;
        club.clubContacts.splice(idx, 1);
        state.selectedClub = club;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMemberClubs.pending, (state) => {
        state.status = "busy";
      })
      .addCase(getMemberClub.pending, (state) => {
        state.status = "busy";
      })
      .addCase(getMembership.pending, (state) => {
        state.status = "busy";
      })
      .addCase(saveMemberClub.pending, (state) => {
        state.status = "busy";
      })
      .addCase(createMembership.pending, (state) => {
        state.status = "busy";
      })
      .addCase(saveClubContact.pending, (state) => {
        state.status = "busy";
      })
      .addCase(removeClubContact.pending, (state) => {
        state.status = "busy";
      })
      .addCase(loadMemberClubs.fulfilled, (state, action) => {
        state.clubs = action.payload.clubs.map((club: IClub) => {
          const membershipId = action.payload.memberships.findIndex((m) => m.club === club.id);
          club.isCurrent = membershipId >= 0;
          return club;
        });
        state.status = "idle";
      })
      .addCase(getMemberClub.fulfilled, (state, action) => {
        state.selectedClub = action.payload;
        state.status = "idle";
      })
      .addCase(getMembership.fulfilled, (state, action) => {
        state.mostRecentMembership = action.payload;
        state.status = "idle";
      })
      .addCase(saveMemberClub.rejected, (state, action) => {
        state.error = action.payload.toString();
        state.status = "idle";
      })
      .addCase(createMembership.rejected, (state, action) => {
        state.error = action.payload.toString();
        state.status = "idle";
      })
      .addCase(saveClubContact.rejected, (state, action) => {
        state.error = action.payload.toString();
        state.status = "idle";
      })
      .addCase(removeClubContact.rejected, (state, action) => {
        state.error = action.payload.toString();
        state.status = "idle";
      });
  },
});

export {
  addNewClubContact,
  appendNewClubContact,
  cancelNewClubContact,
  createMembership,
  getMemberClub,
  getMembership,
  loadMemberClubs,
  memberClubSlice,
  removeClubContact,
  saveClubContact,
  saveMemberClub,
};