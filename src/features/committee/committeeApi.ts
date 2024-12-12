import { ICommitteeData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const committeeApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getCommittee: build.query<ICommitteeData[], void>({
			query: () => apiUrl("/committee/"),
			providesTags: (result) => {
				return result
					? [
							...result.map(({ id }) => ({ type: "Committee", id } as const)),
							{ type: "Committee", id: "LIST" },
					  ]
					: [{ type: "Committee", id: "LIST" }]
			},
		}),
		updateCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/committee/${id}/`),
					method: "PUT",
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Committee", id }],
		}),
		addCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
			query(data) {
				return {
					url: apiUrl("/committee/"),
					method: "POST",
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Committee", id: id }],
		}),
		deleteCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/committee/${id}/`),
					method: "DELETE",
				}
			},
		}),
	}),
})

export const {
	useAddCommitteeMutation,
	useDeleteCommitteeMutation,
	useGetCommitteeQuery,
	useUpdateCommitteeMutation,
} = committeeApi
