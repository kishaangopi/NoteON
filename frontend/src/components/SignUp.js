import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../features/auth/usersApiSlice";
import { setCredientials } from "../features/auth/authSlice";

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [password2, setPassword2] = React.useState("");
	const [register, setRegister] = React.useState({
		email: "",
		password: "",
		username: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		setRegister((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const [registerMutation, { isLoading }] = useRegisterMutation();
	const user = useSelector((state) => state.user);

	React.useEffect(() => {
		if (user) {
			navigate("/notes");
		}
	}, [navigate, user]);

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (register.password !== password2) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const res = await registerMutation({ ...register }).unwrap();
			dispatch(setCredientials({ ...res }));
			navigate("/notes");
		} catch (err) {
			toast.error(err?.data?.message || err?.data?.error);
		}
	};
	return (
		<>
			<h1></h1>
			<div className="signin-form-container">
				<form action="" className="signin-form">
					<input
						type="text"
						placeholder="Username"
						name="username"
						value={register.username}
						onChange={handleChange}
						className="signin-input"
					/>
					<input
						type="text"
						placeholder="Email"
						name="email"
						value={register.email}
						onChange={handleChange}
						className="signin-input"
					/>

					<input
						type="password"
						placeholder="Password"
						name="password"
						value={register.password}
						onChange={handleChange}
						className="signin-input"
					/>
					<input
						type="password"
						placeholder="Retype Password"
						name="password2"
						value={password2}
						className="signin-input"
						onChange={(e) => {
							setPassword2(e.target.value);
						}}
					/>

					<div className="signin-btn" onClick={handleSignUp}>
						Sign UP
					</div>
				</form>
			</div>
		</>
	);
};

export default SignUp;
