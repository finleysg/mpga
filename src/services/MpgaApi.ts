import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./AxiosBaseQuery";

export const mpgaApi = createApi({
  reducerPath: "mpga-api",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
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
});
