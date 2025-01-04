import { AppConfig } from "../../models/AppConfig"
import { ILandingPageData, IPolicyData } from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

const contentApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
    getAppConfig: build.query<AppConfig, void>({
      query: () => apiUrl("/settings/"),
      providesTags: ["AppConfig"],
      transformResponse: (response: any[]) => {
        return {
          eventCalendarYear: response[0].event_calendar_year,
          membershipDues: response[0].membership_dues,
          stripePublicKey: response[0].stripe_public_key
        } as AppConfig
      },
    }),
		getPolicies: build.query<IPolicyData[], string>({
			query: (policyType) => apiUrl(`/policies/?type=${policyType}`),
			providesTags: (result) => {
				const { policy_type } = result[0]
				return result
					? [
							...result.map(({ id }) => ({ type: "Policies", id } as const)),
							{ type: "Policies", policy_type },
					  ]
					: [{ type: "Policies", policy_type }]
			},
		}),
		updatePolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/policies/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Policies", id }],
		}),
		addPolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
			query(data) {
				return {
					url: apiUrl("/policies/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "Policies" }],
		}),
		deletePolicy: build.mutation<IPolicyData, Partial<IPolicyData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/policies/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "Policies" }],
		}),
		getPageContent: build.query<ILandingPageData[], void>({
			query: () => apiUrl("/pages/"),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Pages", id } as const)),
							{ type: "Pages", id: "LIST" },
					  ]
					: [{ type: "Pages", id: "LIST" }],
		}),
		updatePageContent: build.mutation<ILandingPageData, Partial<ILandingPageData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/pages/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: "Pages", id }],
		}),
	}),
})

export const {
	useAddPolicyMutation,
	useDeletePolicyMutation,
  useGetAppConfigQuery,
	useGetPageContentQuery,
	useGetPoliciesQuery,
	useUpdatePageContentMutation,
	useUpdatePolicyMutation,
} = contentApi
