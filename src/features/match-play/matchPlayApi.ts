import { IMatchPlayResultData, ITeamData } from "services/Data";
import { mpgaApi } from "services/MpgaApi";

import constants from "../../constants";

const extendedApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<ITeamData[], void>({
      query: () => ({ url: `/teams/?year=${constants.MatchPlayYear}`, method: "GET" }),
    }),
    getMatchResults: build.query<IMatchPlayResultData[], void>({
      query: () => ({ url: `/match-results/?year=${constants.MatchPlayYear}/`, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "MatchPlayResults", id } as const)),
              { type: "MatchPlayResults", id: "LIST" },
            ]
          : [{ type: "MatchPlayResults", id: "LIST" }],
    }),
    addMatchResult: build.mutation<IMatchPlayResultData, Partial<IMatchPlayResultData>>({
      query(data) {
        return {
          url: "/match-results/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "MatchPlayResults", id }],
    }),
  }),
});

export const { useGetTeamsQuery, useGetMatchResultsQuery, useAddMatchResultMutation } = extendedApi;
