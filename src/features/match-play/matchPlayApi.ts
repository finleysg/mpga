import constants from "../../app-constants"
import { IMatchPlayResultData, ITeamData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const extendedApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getTeams: build.query<ITeamData[], void>({
			query: () => apiUrl(`/teams/?year=${constants.MatchPlayYear}`),
		}),
		getMatchResults: build.query<IMatchPlayResultData[], void>({
			query: () => apiUrl(`/match-results/?year=${constants.MatchPlayYear}`),
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
					url: apiUrl("/match-results/"),
					method: "POST",
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [
				{ type: "MatchPlayResults", id },
				{ type: "MatchPlayResults", id: "LIST" },
			],
		}),
	}),
})

export const { useGetTeamsQuery, useGetMatchResultsQuery, useAddMatchResultMutation } = extendedApi
