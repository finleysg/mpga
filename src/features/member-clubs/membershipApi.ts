import { IMembershipData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const extendedApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getMembershipsForYear: build.query<IMembershipData[], number>({
			query: (year) => apiUrl(`/memberships/?year=${year}`),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Memberships", id } as const)),
							{ type: "Memberships", id: "LIST" },
					  ]
					: [{ type: "Memberships", id: "LIST" }],
		}),
		getMembershipsForClub: build.query<IMembershipData[], number>({
			query: (clubId) => apiUrl(`/memberships/?club=${clubId}`),
			providesTags: (_result, _error, clubId) => [{ type: "Memberships", id: clubId }],
		}),
		addMembershipForClub: build.mutation<IMembershipData, Partial<IMembershipData>>({
			query(data) {
				const { club } = data
				return {
					url: apiUrl(`/memberships/?club=${club}`),
					method: "POST",
					data,
				}
			},
			invalidatesTags: (_result, _error, { club }) => [{ type: "Memberships", id: club }],
		}),
	}),
})

export const {
	useGetMembershipsForClubQuery,
	useGetMembershipsForYearQuery,
	useAddMembershipForClubMutation,
} = extendedApi
