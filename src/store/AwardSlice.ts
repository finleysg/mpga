import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app-store";
import { Api } from "../http";
import { IAwardData, IAwardWinnerData } from "../models/Data";
import { ActionStatus } from "./Utilities";

const url = "/awards/";
const winnerUrl = "/award-winners/";

export interface IAwardState {
  data: object;
  status: ActionStatus;
  error?: string;
}

export const defaultState: IAwardState = {
  data: {},
  status: ActionStatus.Idle,
};

const addNewAwardWinner = createAction<string>("awardWinner/add");
const cancelNewAwardWinner = createAction<string>("awardWinner/cancel");

const loadAward = createAsyncThunk<IAwardData, string, { state: RootState }>("award/load", async (awardName) => {
  const response = await Api.get(url + "?name=" + awardName);
  return response.data[0] as IAwardData;
});

const saveAward = createAsyncThunk<void, IAwardData>("award/save", async (award) => {
  if (!award.id) {
    await Api.post(url, award);
  } else {
    await Api.put(`${url}${award.id}/`, award);
  }
});

const saveAwardWinner = createAsyncThunk<void, IAwardWinnerData>("awardWinner/save", async (winner) => {
  if (!winner.id) {
    await Api.post(winnerUrl, winner);
  } else {
    await Api.put(`${winnerUrl}${winner.id}/`, winner);
  }
});

const awardSlice = createSlice({
  name: "awards",
  initialState: defaultState,
  reducers: {
    addNewAwardWinner(state, action) {
      const award = state.data[action.payload];
      const winners = award.winners.slice(0);
      winners.unshift({ id: 0 } as IAwardData);
      award.winners = winners;
      state.data[action.payload] = award;
    },
    cancelNewAwardWinner(state, action) {
      const award = state.data[action.payload];
      const winners = award.winners.slice(0);
      const idx = winners.findIndex((w) => w.id === 0);
      if (idx > -1) {
        winners.splice(idx, 1);
        award.winners = winners;
        state.data[action.payload] = award;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAward.fulfilled, (state, action) => {
        state.data[action.payload.name] = action.payload;
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

export { addNewAwardWinner, awardSlice, cancelNewAwardWinner, loadAward, saveAward, saveAwardWinner };
