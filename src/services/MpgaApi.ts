import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mpgaApi = createApi({
	reducerPath: "mpga-api",
	baseQuery: fetchBaseQuery({ baseUrl: "", credentials: "include" }),
	tagTypes: [
		"Announcements",
		"Awards",
		"Clubs",
		"ClubContacts",
		"Committee",
		"Contacts",
		"Documents",
		"Events",
		"MatchPlayResults",
		"Memberships",
		"Pages",
		"Photos",
		"Policies",
		"Tournaments",
		"Tournament-Winners",
	],
	keepUnusedDataFor: 150,
	endpoints: () => ({}),
})
