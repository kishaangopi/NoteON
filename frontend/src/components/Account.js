import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/usersApiSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Account = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutMutation, { isLoading }] = useLogoutMutation();

	const signout = async () => {
		try {
			const res = await logoutMutation().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err?.data?.error);
		}
	};
	return (
		<div className="account">
			{/* <div className="account-header">
				<div className="account-info">
					<span>Hello,</span>
					<p>{props.name}</p>
				</div>
				<img src={props.img} alt="" className="account-image" />
			</div>
			<div className="data">
				<div className="data-item">
					<p>Total Notes</p>
					<div className="item-count">
						<div className="count-color"></div>
						<span>{props.totalNotes}</span>
					</div>
				</div>
				<div className="data-item">
					<p>Favourites</p>
					<div className="item-count">
						<div className="count-color"></div>
						<span>{props.totalCollection}</span>
					</div>
				</div>
				<div className="data-item">
					<p>In Progress</p>
					<div className="item-count">
						<div className="count-color"></div>
						<span>{props.inProgress}</span>
					</div>
				</div>
				<div className="data-item">
					<p>Out of Shedule</p>
					<div className="item-count">
						<div className="count-color"></div>
						<span>{props.ofShedule}</span>
					</div>
				</div>
			</div> */}
			<div className="signout">
				<p>Click the button to signOut</p>
				<button onClick={signout}>Sign Out</button>
			</div>
		</div>
	);
};

export default Account;
