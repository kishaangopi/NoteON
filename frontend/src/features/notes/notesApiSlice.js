import { apiSlice } from "../apiSlice";
const NOTES_URL = "/notes";

export const notesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => ({
				url: `${NOTES_URL}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",

					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
		createNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "POST",
				body: data,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
		updateNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "PUT",
				body: data,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Origin": "*",
				},
				mode: "no-cors",
			}),
		}),
		deleteNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": "true",
				},
				mode: "no-cors",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetNotesQuery,
	useCreateNotesMutation,
	useUpdateNotesMutation,
	useDeleteNotesMutation,
} = notesApiSlice;
