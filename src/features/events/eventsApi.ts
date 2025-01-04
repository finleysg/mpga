import moment from "moment"

import { EventDetail } from "../../models/Events"
import {
	IEventData,
	IEventDetailData,
	IEventLinkData,
	IEventPointsData,
	IEventPolicyData,
} from "../../services/Data"
import { mpgaApi } from "../../services/MpgaApi"
import { apiUrl } from "../../utilities/HttpClient"

export const prepareEvent = (evt: EventDetail): Partial<IEventData> => {
	return {
		id: evt.id,
		location: evt.location?.id,
		tournament: evt.tournament?.id,
		name: evt.name,
		description: evt.description,
		rounds: evt.rounds,
		notes: evt.notes,
		event_type: evt.eventType,
		start_date: moment(evt.startDate).format("YYYY-MM-DD"),
		registration_start: evt.registrationStart.toISOString(),
		registration_end: evt.registrationEnd.toISOString(),
		early_registration_end: evt.earlyRegistrationEnd.toISOString(),
	}
}

const eventApi = mpgaApi.injectEndpoints({
	endpoints: (build) => ({
		getEvents: build.query<IEventDetailData[], number>({
			query: (year) => apiUrl("/events/?year=" + year),
			providesTags: (result) => [
				...result.map(({ id }) => ({ type: "Events", id } as const)),
				{ type: "Events", id: "LIST" },
			],
		}),
		getEvent: build.query<IEventDetailData, { name: string; year: number }>({
			query: ({ name, year }) => apiUrl(`/events/?name=${name}&year=${year}`),
			transformResponse: (response: IEventDetailData[]) => {
				return response?.length === 1 ? response[0] : undefined
			},
			providesTags: (result) => [{ type: "Events", id: result?.id }],
		}),
		updateEvent: build.mutation<IEventData, Partial<IEventData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/events/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error) => [{ type: "Events" }],
		}),
		addEventLink: build.mutation<IEventLinkData, Partial<IEventLinkData>>({
			query(data) {
				return {
					url: apiUrl("/event-links/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		updateEventLink: build.mutation<IEventLinkData, Partial<IEventLinkData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-links/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		removeEventLink: build.mutation<IEventLinkData, Partial<IEventLinkData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-links/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		addEventPoints: build.mutation<IEventPointsData, Partial<IEventPointsData>>({
			query(data) {
				return {
					url: apiUrl("/event-points/"),
					method: "POST",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		updateEventPoints: build.mutation<IEventPointsData, Partial<IEventPointsData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-points/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		removeEventPoints: build.mutation<IEventPointsData, Partial<IEventPointsData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-points/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		updateEventPolicy: build.mutation<IEventPolicyData, Partial<IEventPolicyData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-policies/${id}/`),
					method: "PUT",
					body: data,
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
		removeEventPolicy: build.mutation<IEventPolicyData, Partial<IEventPolicyData>>({
			query(data) {
				const { id } = data
				return {
					url: apiUrl(`/event-policies/${id}/`),
					method: "DELETE",
				}
			},
			invalidatesTags: (_result, _error, { event }) => [{ type: "Events", id: event }],
		}),
	}),
})

export const {
	useAddEventLinkMutation,
	useAddEventPointsMutation,
	useGetEventQuery,
	useGetEventsQuery,
	useRemoveEventLinkMutation,
	useRemoveEventPointsMutation,
	useRemoveEventPolicyMutation,
	useUpdateEventLinkMutation,
	useUpdateEventMutation,
	useUpdateEventPointsMutation,
	useUpdateEventPolicyMutation,
} = eventApi
