import { IAwardData, IAwardWinnerData } from "../models/Data";
import { mpgaApi } from "./MpgaApi";

const awardApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getAwards: build.query<IAwardData[], void>({
      query: () => ({ url: "/awards/", method: "GET" }),
      providesTags: ["Awards"],
    }),
    getAward: build.query<IAwardData, number>({
      query: (id) => ({ url: `/awards/${id}/`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: "Awards", id }],
    }),
    updateAward: build.mutation<IAwardData, Partial<IAwardData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/awards/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Awards", id }],
    }),
    addWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
      query(data) {
        return {
          url: "/award-winners/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
    }),
    updateWinner: build.mutation<IAwardWinnerData, Partial<IAwardWinnerData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/award-winners/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { award }) => [{ type: "Awards", id: award }],
    }),
  }),
});

export const {
  useGetAwardQuery,
  useGetAwardsQuery,
  useAddWinnerMutation,
  useUpdateAwardMutation,
  useUpdateWinnerMutation,
} = awardApi;
