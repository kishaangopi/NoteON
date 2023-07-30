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
					"Access-Control-Allow-Headers":
						"Origin, X-Requested-With, Content-Type, Accept",
				},
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers":
						"Origin, X-Requested-With, Content-Type, Accept",
				},
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers":
						"Origin, X-Requested-With, Content-Type, Accept",
				},
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
	usersApiSlice;
