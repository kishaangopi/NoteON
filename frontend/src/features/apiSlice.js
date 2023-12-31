import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_URL,
	credentials: "include",
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Users", "Notes"],
	endpoints: (builder) => ({}),
});
