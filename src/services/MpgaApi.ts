import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mpgaApi = createApi({
	reducerPath: "mpga-api",
	baseQuery: fetchBaseQuery({ baseUrl: "", credentials: "include" }),
	tagTypes: [
    "AppConfig",
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
		"Roles",
		"Tags",
		"Tournaments",
		"Tournament-Winners",
	],
	keepUnusedDataFor: 300,
	endpoints: () => ({}),
})
