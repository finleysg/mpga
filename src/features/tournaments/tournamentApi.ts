import { ITournamentData, ITournamentWinnerData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const tournamentApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getTournaments: build.query<ITournamentData[], void>({
			query: () => apiUrl("/tournaments/"),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Tournaments", id } as const)),
							{ type: "Tournaments", id: "LIST" },
					  ]
					: [{ type: "Tournaments", id: "LIST" }],
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
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Tournaments", id }],
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
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [
				{ type: "Tournament-Winners", id },
				{ type: "Tournament-Winners", id: "LIST" },
			],
		}),
		updateTournamentWinner: build.mutation<ITournamentWinnerData, Partial<ITournamentWinnerData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/tournament-winners/${id}/`),
					method: "PUT",
					data,
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
