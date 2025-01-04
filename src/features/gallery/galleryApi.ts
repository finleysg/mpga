import { IPhotoData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"
import { IPhotoSearch, PhotoParams } from "./galleryPropTypes"

const prepareFormData = (params: PhotoParams): FormData => {
	const { photo, file } = params
	const form = new FormData()
	if (photo.id) {
		form.append("id", photo.id.toString())
	}
	if (photo.tournament) {
		form.append("tournament", photo.tournament.toString())
	}
	if (photo.tags) {
		form.append("tags", photo.tags.map((t) => t.tag).join("|"))
	}
	form.append("photo_type", photo.photo_type)
	form.append("year", photo.year.toString())
	form.append("caption", photo.caption || "")
	form.append("raw_image", file, file.name)
	return form
}

const prepareQueryString = (query: IPhotoSearch): string => {
	let querystring = "?d=1"
	const year = query.year || 0
	const tournamentId = query.tournamentId || 0
	if (year > 0) {
		querystring = querystring + `&year=${year}`
	}
	if (tournamentId > 0) {
		querystring = querystring + `&tournament=${tournamentId}`
	}
	return querystring
}

const extendedApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getPhotos: build.query<IPhotoData[], IPhotoSearch>({
			query: (q) => apiUrl("/photos/" + prepareQueryString(q)),
			providesTags: [{ type: "Photos", id: "LIST" }],
		}),
		getRandomPhoto: build.query<IPhotoData, number>({
			query: (tournamentId) => apiUrl(`/tournament-photos/random/${tournamentId}/`),
		}),
		updatePhoto: build.mutation<IPhotoData, PhotoParams>({
			query(params) {
				const { id } = params.photo
				return {
					url: apiUrl(`/photos/${id}/`),
					method: "PUT",
					body: prepareFormData(params),
				}
			},
			invalidatesTags: [{ type: "Photos" }],
		}),
		addPhoto: build.mutation<IPhotoData, PhotoParams>({
			query(params) {
				return {
					url: apiUrl("/photos/"),
					method: "POST",
					body: prepareFormData(params),
				}
			},
			invalidatesTags: [{ type: "Photos" }],
		}),
		deletePhoto: build.mutation<IPhotoData, number>({
			query(id) {
				return {
					url: apiUrl(`/photos/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: [{ type: "Photos" }],
		}),
	}),
})

export const {
	useGetPhotosQuery,
	useGetRandomPhotoQuery,
	useAddPhotoMutation,
	useUpdatePhotoMutation,
	useDeletePhotoMutation,
} = extendedApi
