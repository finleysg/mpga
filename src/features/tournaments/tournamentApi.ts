import { ITournamentData, ITournamentWinnerData } from "services/Data";
import { mpgaApi } from "services/MpgaApi";

const tournamentApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getTournaments: build.query<ITournamentData[], void>({
      query: () => ({ url: "/tournaments/", method: "GET" }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Tournaments", id } as const)), { type: "Tournaments", id: "LIST" }]
          : [{ type: "Tournaments", id: "LIST" }],
    }),
    getTournament: build.query<ITournamentData, string>({
      query: (name) => ({ url: `/tournaments/?name=${name}`, method: "GET" }),
      transformResponse: (response: ITournamentData[]) => {
        return response?.length === 1 ? response[0] : undefined;
      },
      providesTags: (_result, _error, id) => [{ type: "Tournaments", id }],
    }),
    updateTournament: build.mutation<ITournamentData, Partial<ITournamentData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/tournaments/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tournaments", id }],
    }),
    getTournamentWinners: build.query<ITournamentWinnerData[], string>({
      query: (name) => ({ url: "/tournament-winners/?name=" + name, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tournament-Winners", id } as const)),
              { type: "Tournament-Winners", id: "LIST" },
            ]
          : [{ type: "Tournament-Winners", id: "LIST" }],
    }),
    addTournamentWinner: build.mutation<ITournamentWinnerData, Partial<ITournamentWinnerData>>({
      query(data) {
        return {
          url: "/tournament-winners/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tournament-Winners", id }],
    }),
    updateTournamentWinner: build.mutation<ITournamentWinnerData, Partial<ITournamentWinnerData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/tournament-winners/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tournament-Winners", id }],
    }),
  }),
});

export const {
  useGetTournamentQuery,
  useAddTournamentWinnerMutation,
  useGetTournamentWinnersQuery,
  useGetTournamentsQuery,
  useUpdateTournamentMutation,
  useUpdateTournamentWinnerMutation,
} = tournamentApi;
