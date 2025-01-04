import { IClubContactData, IClubData, IContactData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const clubApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getClubs: build.query<IClubData[], void>({
			query: () => apiUrl("/clubs/"),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Clubs", id } as const)),
							{ type: "Clubs", id: "LIST" },
					  ]
					: [{ type: "Clubs", id: "LIST" }],
		}),
		getClub: build.query<IClubData, number>({
			query: (id) => apiUrl(`/clubs/${id}`),
			providesTags: (_result, _error, id) => [{ type: "Clubs", id }],
		}),
		updateClub: build.mutation<IClubData, Partial<IClubData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/clubs/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Clubs", id }],
		}),
		updateCourse: build.mutation<IClubData, Partial<IClubData>>({
			query(data) {
				const { id } = data.golf_course
				return {
					url: apiUrl(`/courses/${id}/`),
					method: "PATCH",
					body: data.golf_course,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Clubs", id }],
		}),
		addClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
			query(data) {
				return {
					url: apiUrl("/club-contacts/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
		}),
		updateClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/club-contacts/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
		}),
		removeClubContact: build.mutation<IClubContactData, Partial<IClubContactData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/club-contacts/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error, { club }) => [{ type: "Clubs", id: club }],
		}),
		getClubContacts: build.query<IClubContactData[], void>({
			query() {
				return {
					url: apiUrl("/club-contacts/"),
					method: "GET",
				}
			},
			providesTags: ["ClubContacts"],
		}),
		getContacts: build.query<IContactData[], void>({
			query() {
				return {
					url: apiUrl("/contacts/"),
					method: "GET",
				}
			},
			providesTags: ["Contacts"],
		}),
		getRoles: build.query<{ id: number; name: string }[], void>({
			query: () => apiUrl("/roles/"),
			providesTags: ["Roles"],
		}),
	}),
})

export const {
	useGetClubContactsQuery,
	useGetClubQuery,
	useGetClubsQuery,
	useGetContactsQuery,
	useGetRolesQuery,
	useUpdateClubMutation,
	useAddClubContactMutation,
	useUpdateClubContactMutation,
	useUpdateCourseMutation,
	useRemoveClubContactMutation,
} = clubApi
