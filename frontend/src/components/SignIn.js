import React from "react";
import noteimage from "../noteimg.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/auth/usersApiSlice";
import { setCredientials } from "../features/auth/authSlice";

const SignIn = () => {
	const navigate = useNavigate();
	const diaptach = useDispatch();

	const [signin, setSignin] = React.useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		setSignin((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const [login, { isLoading }] = useLoginMutation();
	const user = useSelector((state) => state.user);

	React.useEffect(() => {
		if (user) {
			navigate("/notes");
		}
	}, [navigate, user]);

	function scrollToSection() {
		const targetSection = document.getElementById("form");
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth" });
		}
	}

	const handlesignin = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ ...signin }).unwrap();
			diaptach(setCredientials({ ...res }));
			navigate("/notes");
		} catch (err) {
			toast.error(err?.data?.message || err?.data?.error);
		}
	};

	return (
		<div>
			<div className="section-signin">
				<div className="signin-container">
					<img src={noteimage} alt="" />
					<div className="signin-content">
						<h1>noteON</h1>
						<p>
							The ultimate note app with all functionalities and minimalism to
							note down your quick thoughts and plan your day's tasks.
						</p>
						<div className="button-container">
							<div className="signin-btn" onClick={scrollToSection}>
								Sign IN
							</div>
							<div className="signin-btn" onClick={() => navigate("/signup")}>
								Sign UP
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="signin-form-container" id="form">
				<form action="" className="signin-form">
					<input
						type="text"
						placeholder="Email"
						name="email"
						value={signin.email}
						onChange={handleChange}
						className="signin-input"
					/>

					<input
						type="password"
						placeholder="Password"
						name="password"
						value={signin.password}
						onChange={handleChange}
						className="signin-input"
					/>
					<div className="signin-btn" onClick={handlesignin}>
						Sign IN
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
