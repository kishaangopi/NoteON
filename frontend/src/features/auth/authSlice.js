import { createSlice } from "@reduxjs/toolkit";

//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredientials: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
});

export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
