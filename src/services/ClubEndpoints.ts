import { IClubContactData, IClubData } from "../models/Data";
import { mpgaApi } from "./MpgaApi";

const clubApi = mpgaApi.injectEndpoints({
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
  }),
});

export const {
  useGetClubQuery,
  useGetClubsQuery,
  useUpdateClubMutation,
  useAddClubContactMutation,
  useUpdateClubContactMutation,
  useRemoveClubContactMutation,
} = clubApi;
