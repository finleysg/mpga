import constants from "../../app-constants"
import { IMatchPlayResultData, ITeamData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const extendedApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getTeams: build.query<ITeamData[], void>({
			query: () => apiUrl(`/teams/?year=${constants.CurrentYear}`),
		}),
		getMatchResults: build.query<IMatchPlayResultData[], void>({
			query: () => apiUrl(`/match-results/?year=${constants.CurrentYear}`),
			providesTags: () => [{ type: "MatchPlayResults" }],
		}),
		addMatchResult: build.mutation<IMatchPlayResultData, Partial<IMatchPlayResultData>>({
			query(data) {
				return {
					url: apiUrl("/match-results/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "MatchPlayResults" }],
		}),
	}),
})

export const { useGetTeamsQuery, useGetMatchResultsQuery, useAddMatchResultMutation } = extendedApi
