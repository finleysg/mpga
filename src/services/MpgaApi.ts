import { createApi } from "@reduxjs/toolkit/query/react";

import { IAwardData, IAwardWinnerData, IClubContactData, IClubData, IMembershipData } from "../models/Data";
import { axiosBaseQuery } from "./AxiosBaseQuery";

export const mpgaApi = createApi({
  reducerPath: "mpga",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["Clubs", "Memberships", "Awards"],
  keepUnusedDataFor: 300,
  endpoints: (build) => ({
    getClubs: build.query<IClubData[], void>({
      query: () => ({ url: "/clubs/", method: "GET" }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Clubs", id } as const)), { type: "Clubs", id: "LIST" }]
          : [{ type: "Clubs", id: "LIST" }],
    }),
    getClub: build.query<IClubData, number>({
      query: (id) => ({ url: `/clubs/${id}`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: "Clubs", id }],
    }),
    updateClub: build.mutation<IClubData, Partial<IClubData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/clubs/${id}`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Clubs", id }],
    }),
    addClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
      query(data) {
        return {
          url: "/club-contacts/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
    }),
    updateClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/club-contacts/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
    }),
    removeClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/club-contacts/${id}/`,
          method: "POST",
        };
      },
      invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
    }),
    getMembershipsForYear: build.query<IMembershipData[], number>({
      query: (year) => ({ url: `/memberships/?year=${year}`, method: "GET" }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Memberships", id } as const)), { type: "Memberships", id: "LIST" }]
          : [{ type: "Memberships", id: "LIST" }],
    }),
    getMembershipsForClub: build.query<IMembershipData[], number>({
      query: (clubId) => ({ url: `/memberships/?club=${clubId}`, method: "GET" }),
      providesTags: (_result, _error, clubId) => [{ type: "Memberships", id: clubId }],
    }),
    addMembershipForClub: build.mutation<IMembershipData, Partial<IMembershipData>>({
      query(data) {
        const { club } = data;
        return {
          url: `/memberships/?club=${club}`,
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { club }) => [{ type: "Memberships", id: club }],
    }),
    getAwards: build.query<IAwardData[], void>({
      query: () => ({ url: "/awards/", method: "GET" }),
      providesTags: ["Awards"],
    }),
    getAward: build.query<IAwardData, number>({
      query: (id) => ({ url: `/awards/${id}/`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: "Awards", id }],
    }),
    updateAward: build.mutation<IAwardData, Partial<IAwardData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/awards/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Awards", id }],
    }),
    addWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
      query(data) {
        return {
          url: "/award-winners/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
    }),
    updateWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/award-winners/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
    }),
  }),
});

export const {
  useGetClubQuery,
  useGetClubsQuery,
  useUpdateClubMutation,
  useAddClubContactMutation,
  useUpdateClubContactMutation,
  useRemoveClubContactMutation,
  useGetAwardQuery,
  useGetAwardsQuery,
  useAddWinnerMutation,
  useUpdateAwardMutation,
  useUpdateWinnerMutation,
  useGetMembershipsForClubQuery,
  useGetMembershipsForYearQuery,
  useAddMembershipForClubMutation,
} = mpgaApi;
