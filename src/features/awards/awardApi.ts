import { IAwardData, IAwardWinnerData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const awardApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getAwards: build.query<IAwardData[], void>({
			query: () => apiUrl("/awards/"),
			providesTags: ["Awards"],
		}),
		getAward: build.query<IAwardData, number>({
			query: (id) => apiUrl(`/awards/${id}/`),
			providesTags: (_result, _error, id) => [{ type: "Awards", id }],
		}),
		updateAward: build.mutation<IAwardData, Partial<IAwardData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/awards/${id}/`),
					method: "PUT",
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Awards", id }],
		}),
		addWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
			query(data) {
				return {
					url: apiUrl("/award-winners/"),
					method: "POST",
					data,
				}
			},
			invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
		}),
		updateWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/award-winners/${id}/`),
					method: "PUT",
					data,
				}
			},
			invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
		}),
	}),
})

export const {
	useGetAwardQuery,
	useGetAwardsQuery,
	useAddWinnerMutation,
	useUpdateAwardMutation,
	useUpdateWinnerMutation,
} = awardApi
