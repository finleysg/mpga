import { IPhotoData } from "../../services/Data";
import { mpgaApi } from "../../services/MpgaApi";
import { IPhotoSearch, PhotoParams } from "./galleryPropTypes";

const prepareFormData = (params: PhotoParams): FormData => {
  const { photo, file } = params;
  const form = new FormData();
  if (photo.id) {
    form.append("id", photo.id.toString());
  }
  if (photo.tournament) {
    form.append("tournament", photo.tournament.toString());
  }
  if (photo.tags) {
    form.append("tags", photo.tags.map((t) => t.tag).join("|"));
  }
  form.append("photo_type", photo.photo_type);
  form.append("year", photo.year.toString());
  form.append("caption", photo.caption || "");
  form.append("raw_image", file, file.name);
  return form;
};

const prepareQueryString = (query: IPhotoSearch): string => {
  let querystring = "?d=1";
  const year = query.year || 0;
  const tournamentId = query.tournamentId || 0;
  if (year > 0) {
    querystring = querystring + `&year=${year}`;
  }
  if (tournamentId > 0) {
    querystring = querystring + `&tournament=${tournamentId}`;
  }
  return querystring;
};

const extendedApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getPhotos: build.query<IPhotoData[], IPhotoSearch>({
      query: (q) => ({ url: "/photos/" + prepareQueryString(q), method: "GET" }),
      providesTags: [{ type: "Photos", id: "LIST" }],
    }),
    getRandomPhoto: build.query<IPhotoData, number>({
      query: (tournamentId) => ({ url: `/tournament-photos/random/${tournamentId}/`, method: "GET" }),
    }),
    updatePhoto: build.mutation<IPhotoData, PhotoParams>({
      query(params) {
        const { id } = params.photo;
        return {
          url: `/photos/${id}/`,
          method: "PUT",
          data: prepareFormData(params),
        };
      },
      invalidatesTags: [{ type: "Photos", id: "LIST" }],
    }),
    addPhoto: build.mutation<IPhotoData, PhotoParams>({
      query(params) {
        return {
          url: "/photos/",
          method: "POST",
          data: prepareFormData(params),
        };
      },
      invalidatesTags: [{ type: "Photos", id: "LIST" }],
    }),
    deletePhoto: build.mutation<IPhotoData, number>({
      query(id) {
        return {
          url: `/photos/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Photos", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useGetRandomPhotoQuery,
  useAddPhotoMutation,
  useUpdatePhotoMutation,
  useDeletePhotoMutation,
} = extendedApi;
