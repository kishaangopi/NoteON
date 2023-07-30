import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notes: [],
};

export const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		putNotes: (state, action) => {
			state.notes = action.payload;
		},
	},
});

export const { putNotes, reloadNotes } = notesSlice.actions;
export default notesSlice.reducer;
