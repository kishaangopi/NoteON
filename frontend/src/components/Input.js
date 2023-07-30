import React from "react";
import { useCreateNotesMutation } from "../features/notes/notesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { putNotes } from "../features/notes/notesSlice";
import { toast } from "react-toastify";

function UserInput(props) {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes.notes);

	const [createNote, { isLoading }] = useCreateNotesMutation();
	//note object
	let [object, setOBject] = React.useState({
		title: "",
		content: "",
		status: "none",
		important: false,
	});
	function editNote(e) {
		let { name, value } = e.target;
		setOBject((previousObject) => {
			return {
				...previousObject,
				[name]: value,
			};
		});
	}

	const passNote = async () => {
		try {
			const res = await createNote(object);
			const note = res.data;
			if (!res.error) {
				dispatch(putNotes([...notes, note]));
			} else {
				toast.error(res.error.data.message);
			}
		} catch (err) {
			toast.error(err.message);
		}

		setOBject({
			title: "",
			content: "",
			important: false,
			status: "none",
		});
	};

	return (
		<div className="container-input">
			<div className="input-box">
				<input
					onChange={editNote}
					name="title"
					className="input-title"
					value={object.title}
					placeholder="Title"
				></input>
				<textarea
					onChange={editNote}
					name="content"
					rows={5}
					cols={46}
					className="input-note"
					value={object.content}
					placeholder="Content ..."
				></textarea>
				<select
					name="status"
					onChange={editNote}
					value={object.status}
					className="note-progress"
				>
					<option value="none">Choose Your Progress</option>
					<option value="completed">Completed</option>
					<option value="inprogress">In Progress</option>
					<option value="outofshedule">Out of Shedule</option>
				</select>
				<button onClick={passNote} className="input-add">
					+
				</button>
			</div>
		</div>
	);
}

export default UserInput;
