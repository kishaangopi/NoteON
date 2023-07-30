import { apiSlice } from "../apiSlice";
const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	usersApiSlice;
