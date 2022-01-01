import { IMembershipData } from "../models/Data";
import { mpgaApi } from "./MpgaApi";

const extendedApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const { useGetMembershipsForClubQuery, useGetMembershipsForYearQuery, useAddMembershipForClubMutation } =
  extendedApi;
