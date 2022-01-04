import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./AxiosBaseQuery";

export const mpgaApi = createApi({
  reducerPath: "mpga-api",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: [
    "Clubs",
    "Memberships",
    "Awards",
    "Announcements",
    "Policies",
    "Pages",
    "Committee",
    "Contacts",
    "ClubContacts",
    "Tournaments",
    "Tournament-Winners",
  ],
  keepUnusedDataFor: 150,
  endpoints: () => ({}),
});
