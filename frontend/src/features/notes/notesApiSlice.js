import { apiSlice } from "../apiSlice";
const NOTES_URL = "/notes";

export const notesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotes: builder.query({
			query: () => ({
				url: `${NOTES_URL}`,
				method: "GET",

				mode: "no-cors",
			}),
		}),
		createNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		updateNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "PUT",
				body: data,
			}),
		}),
		deleteNotes: builder.mutation({
			query: (data) => ({
				url: `${NOTES_URL}`,
				method: "DELETE",

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
