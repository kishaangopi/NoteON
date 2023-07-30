import { apiSlice } from "../apiSlice";
const NOTES_URL = "/notes";

export const notesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => ({
				url: `${NOTES_URL}`,
				method: "GET",
				headers: {
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
					"Access-Control-Allow-Origin": "*",
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
