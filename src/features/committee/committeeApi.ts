import { ICommitteeData } from "services/Data";
import { mpgaApi } from "services/MpgaApi";

const committeeApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getCommittee: build.query<ICommitteeData[], void>({
      query: () => ({ url: "/committees/", method: "GET" }),
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: "Committee", id } as const)), { type: "Committee", id: "LIST" }]
          : [{ type: "Committee", id: "LIST" }];
      },
    }),
    updateCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/committees/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Committee", id }],
    }),
    addCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
      query(data) {
        return {
          url: "/committees/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Committee", id: id }],
    }),
    deleteCommittee: build.mutation<ICommitteeData, Partial<ICommitteeData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/committees/${id}/`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useAddCommitteeMutation, useDeleteCommitteeMutation, useGetCommitteeQuery, useUpdateCommitteeMutation } =
  committeeApi;
