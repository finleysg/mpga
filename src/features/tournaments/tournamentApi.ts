import { ITournamentData, ITournamentWinnerData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const tournamentApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getTournaments: build.query<ITournamentData[], void>({
			query: () => apiUrl("/tournaments/"),
			providesTags: () => [{ type: "Tournaments" }],
		}),
		getTournament: build.query<ITournamentData, string>({
			query: (name) => apiUrl(`/tournaments/?name=${name}`),
			transformResponse: (response: ITournamentData[]) => {
				return response?.length === 1 ? response[0] : undefined
			},
			providesTags: (_result, _error, id) => [{ type: "Tournaments", id }],
		}),
		updateTournament: build.mutation<ITournamentData, Partial<ITournamentData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/tournaments/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "Tournaments" }, { type: "Events" }],
		}),
		getTournamentWinners: build.query<ITournamentWinnerData[], string>({
			query: (name) => apiUrl("/tournament-winners/?name=" + name),
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
					url: apiUrl("/tournament-winners/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "Tournament-Winners" }],
		}),
		updateTournamentWinner: build.mutation<ITournamentWinnerData, Partial<ITournamentWinnerData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/tournament-winners/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Tournament-Winners", id }],
		}),
	}),
})

export const {
	useGetTournamentQuery,
	useAddTournamentWinnerMutation,
	useGetTournamentWinnersQuery,
	useGetTournamentsQuery,
	useUpdateTournamentMutation,
	useUpdateTournamentWinnerMutation,
} = tournamentApi
