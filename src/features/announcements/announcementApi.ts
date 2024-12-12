import { IAnnouncementData, IContactMessageData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const extendedApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getAnnouncements: build.query<IAnnouncementData[], void>({
			query: () => apiUrl("/announcements/"),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Announcements", id } as const)),
							{ type: "Announcements", id: "LIST" },
					  ]
					: [{ type: "Announcements", id: "LIST" }],
		}),
		updateAnnouncement: build.mutation<IAnnouncementData, Partial<IAnnouncementData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/announcements/${id}/`),
					method: "PUT",
					data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Announcements", id }],
		}),
		addAnnouncement: build.mutation<IAnnouncementData, Partial<IAnnouncementData>>({
			query(data) {
				return {
					url: apiUrl("/announcements/"),
					method: "POST",
					data,
				}
			},
			invalidatesTags: [{ type: "Announcements", id: "LIST" }],
		}),
		deleteAnnouncement: build.mutation<IAnnouncementData, Partial<IAnnouncementData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/announcements/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Announcements", id }],
		}),
		sendMessage: build.mutation<IContactMessageData, Partial<IContactMessageData>>({
			query(data) {
				return {
					url: apiUrl("/messages/"),
					method: "POST",
					data,
				}
			},
		}),
	}),
})

export const {
	useGetAnnouncementsQuery,
	useAddAnnouncementMutation,
	useUpdateAnnouncementMutation,
	useDeleteAnnouncementMutation,
} = extendedApi
