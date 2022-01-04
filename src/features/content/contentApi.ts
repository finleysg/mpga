import { ILandingPageData, IPolicyData } from "../../services/Data";
import { mpgaApi } from "../../services/MpgaApi";

const contentApi = mpgaApi.injectEndpoints({
  endpoints: (build) => ({
    getPolicies: build.query<IPolicyData[], string>({
      query: (policyType) => ({ url: "/policies/?type=" + policyType, method: "GET" }),
      providesTags: (result) => {
        const { policy_type } = result[0];
        return result
          ? [...result.map(({ id }) => ({ type: "Policies", id } as const)), { type: "Policies", policy_type }]
          : [{ type: "Policies", policy_type }];
      },
    }),
    updatePolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/policies/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Policies", id }],
    }),
    addPolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
      query(data) {
        return {
          url: "/policies/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Policies", id: id }],
    }),
    deletePolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/policies/${id}/`,
          method: "DELETE",
        };
      },
    }),
    getPageContent: build.query<ILandingPageData[], void>({
      query: () => ({ url: "/pages/", method: "GET" }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Pages", id } as const)), { type: "Pages", id: "LIST" }]
          : [{ type: "Pages", id: "LIST" }],
    }),
    updatePageContent: build.mutation<ILandingPageData, Partial<ILandingPageData>>({
      query(data) {
        const { id } = data;
        return {
          url: `/pages/${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Pages", id }],
    }),
  }),
});

export const {
  useAddPolicyMutation,
  useDeletePolicyMutation,
  useGetPageContentQuery,
  useGetPoliciesQuery,
  useUpdatePageContentMutation,
  useUpdatePolicyMutation,
} = contentApi;
