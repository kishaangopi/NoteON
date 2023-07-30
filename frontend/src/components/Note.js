import React from "react";
import TimeAgo from "react-timeago";
import { toast } from "react-toastify";
import { useUpdateNotesMutation } from "../features/notes/notesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { putNotes } from "../features/notes/notesSlice";

function Note(props) {
	const notes = useSelector((state) => state.notes.notes);
	const dispatch = useDispatch();

	const [updateNotes, { isLoading }] = useUpdateNotesMutation();

	const [hover, setHover] = React.useState(false);
	const [fav, setFav] = React.useState(props.important);

	function passDelete() {
		props.delete(props._id);
	}

	function displayDelete() {
		setHover(true);
	}
	function hideDelete() {
		setHover(false);
	}

	const importantCollection = async () => {
		try {
			const res = await updateNotes({
				id: props._id,
				important: !fav,
				title: props.title,
				content: props.content,
				status: props.status,
			});
			const updatedNote = res.data;
			if (!res.error) {
				const noteIndexToUpdate = notes.findIndex(
					(note) => note._id === updatedNote._id
				);

				if (noteIndexToUpdate !== -1) {
					const updatedNotesArray = [...notes];

					updatedNotesArray[noteIndexToUpdate] = updatedNote;

					dispatch(putNotes(updatedNotesArray));
				}
			} else {
				toast.error(res.error.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
		setFav((prev) => {
			return !prev;
		});
	};

	return (
		<div
			className="note"
			onMouseEnter={displayDelete}
			onMouseLeave={hideDelete}
		>
			<h3 className="note-title">{props.title}</h3>
			<p className="note-content">{props.content}</p>
			<button
				className="note-delete"
				onClick={passDelete}
				style={
					hover
						? { visibility: "visible", pointerEvents: "all", opacity: 1 }
						: {}
				}
			>
				<i className="fa fa-trash"></i>
			</button>

			<div className="note-footer">
				<div className="note-date-time">
					<TimeAgo date={`${props.date} ${props.time}`} />
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill={props.important ? "yellow" : "none"}
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6 note-star"
					onClick={importantCollection}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
					/>
				</svg>
			</div>
		</div>
	);
}

export default Note;
