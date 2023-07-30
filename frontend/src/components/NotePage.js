import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Input from "./Input";
import Note from "./Note";
import Account from "./Account";
import { useSelector, useDispatch } from "react-redux";
import {
	useGetNotesQuery,
	useDeleteNotesMutation,
} from "../features/notes/notesApiSlice";
import { putNotes } from "../features/notes/notesSlice";
import { toast } from "react-toastify";

const NotePage = () => {
	const user = useSelector((state) => state.auth.user);
	const Notes = useSelector((state) => state.notes.notes);
	const dispatch = useDispatch();

	const allNotes = useGetNotesQuery();

	const [delNote, { isLoading }] = useDeleteNotesMutation();

	const [imp, setImp] = React.useState([]);
	const [showImp, setShowImp] = React.useState(false);
	const [totalNotes, setTotalNotes] = React.useState();
	const [totalCollection, setTotalCollection] = React.useState();
	const [ofShedule, setOfShedule] = React.useState();
	const [inProgress, setInProgress] = React.useState();
	const [filterTerm, setFilterTerm] = React.useState("");
	const [filter, setFilter] = React.useState([]);

	React.useEffect(() => {
		if (allNotes.data) {
			dispatch(putNotes(allNotes.data));
		}
	}, [allNotes, dispatch]);

	React.useEffect(() => {
		setTotalNotes(() => Notes.length);
		setTotalCollection(() => {
			return Notes.filter((note) => {
				return note.important === true;
			}).length;
		});
		setOfShedule(() => {
			return Notes.filter((note) => {
				return note.status === "outofshedule";
			}).length;
		});
		setInProgress(() => {
			return Notes.filter((note) => {
				return note.status === "inprogress";
			}).length;
		});
	}, [Notes]);

	let [searchList, setSearchList] = React.useState([]);
	let [searchTerm, setSearchTerm] = React.useState("");

	//searching a note with its title
	function searchNote(e) {
		let { value } = e.target;
		setSearchTerm(value);
		if (value !== "") {
			setSearchList(() => {
				return Notes.filter((note_item) => {
					if (note_item.title) {
						return note_item.title.toLowerCase().includes(value.toLowerCase());
					}
				});
			});
		}
	}
	//deleting a note with its id
	const deleteNote = async (id) => {
		try {
			const res = await delNote({ id });
			if (!res.error) {
				const newNotes = Notes.filter((note) => {
					return note._id != id;
				});
				dispatch(putNotes([...newNotes]));
			} else {
				toast.error(res.error.data.message);
			}
		} catch (err) {
			toast.error(err.message);
		}

		setImp(() => {
			return imp?.filter((note_item) => {
				return note_item._id != id;
			});
		});
		setFilter(() => {
			return filter?.filter((note_item) => {
				return note_item._id != id;
			});
		});
	};

	//important collection
	const important = () => {
		setImp(() => {
			return Notes?.filter((note_item) => {
				return note_item.important === true;
			});
		});
	};

	//filtering notes by status
	const filterNotes = (e) => {
		setFilterTerm(e.target.value);
		setFilter(() => {
			if (e.target.value !== "")
				return Notes?.filter((note_item) => {
					return note_item.status === e.target.value;
				});
			else return;
		});
	};
	return (
		<div className="note-app">
			<Header search={searchNote} />
			<Input />
			<div className="sidebar-notes">
				<SideBar important={important} setShowImp={setShowImp} />

				<div className="notes-area">
					<div className="filter">
						<p>Filter By Status</p>
						<select
							name="filterStatus"
							value={filterTerm}
							onChange={filterNotes}
						>
							<option value="">None</option>
							<option value="completed">Completed</option>
							<option value="outofshedule">Out Of Shedule</option>
							<option value="inprogress">In Progress</option>
						</select>
					</div>
					<div className="notes-container">
						{searchTerm === ""
							? filterTerm === ""
								? !showImp
									? Notes?.map((NoteItem, index) => (
											<Note
												key={index}
												index={index}
												_id={NoteItem._id}
												title={NoteItem.title}
												content={NoteItem.content}
												status={NoteItem.status}
												delete={deleteNote}
												date={NoteItem.createdAt}
												time={NoteItem.createdAt}
												important={NoteItem.important}
											/>
									  ))
									: imp.map((NoteItem, index) => (
											<Note
												key={index}
												index={index}
												_id={NoteItem._id}
												title={NoteItem.title}
												content={NoteItem.content}
												status={NoteItem.status}
												delete={deleteNote}
												date={NoteItem.date}
												time={NoteItem.time}
												important={NoteItem.important}
											/>
									  ))
								: filter.map((NoteItem, index) => (
										<Note
											key={index}
											index={index}
											_id={NoteItem._id}
											title={NoteItem.title}
											content={NoteItem.content}
											status={NoteItem.status}
											delete={deleteNote}
											date={NoteItem.date}
											time={NoteItem.time}
											important={NoteItem.important}
										/>
								  ))
							: searchList.map((NoteItem, index) => (
									<Note
										key={index}
										index={index}
										_id={NoteItem._id}
										title={NoteItem.title}
										content={NoteItem.content}
										delete={deleteNote}
										date={NoteItem.date}
										time={NoteItem.time}
										important={NoteItem.important}
									/>
							  ))}
					</div>
				</div>
				<Account
				// img={userData.data.photoURL}
				// name={userData.data.displayName}
				// totalNotes={totalNotes}
				// totalCollection={totalCollection}
				// inProgress={inProgress}
				// ofShedule={ofShedule}
				/>
			</div>
		</div>
	);
};

export default NotePage;
