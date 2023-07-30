import React from "react";
import NotePage from "./components/NotePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="" element={<PrivateRoute />}>
					<Route path="/notes" element={<NotePage />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
