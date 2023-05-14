import { useContext, useState } from "react";
import { TasksDispatchContext, TasksContext } from "../TasksContext";
import { TaskActionType } from "../types";

interface EditTaskProps {
	id: string;
}

const EditTask = ({ id }: EditTaskProps) => {
	const dispatch = useContext(TasksDispatchContext);
	const { tasks } = useContext(TasksContext) || {};

	const task = tasks?.find((task) => task.id === id)!;

	const [newText, setNewText] = useState(task.text);

	return (
		<div className="edit-task">
			<input
				className="styled-input"
				style={{ width: "100%" }}
				type="text"
				defaultValue={task.text}
				onChange={(e) => setNewText(e.target.value)}
			></input>
			<button
				className="styled-button"
				onClick={() => {
					dispatch?.({
						type: TaskActionType.EDIT_TEXT,
						payload: {
							...task,
							text: newText,
						},
					});
					dispatch?.({
						type: TaskActionType.CHANGE_EDITING,
						payload: { ...task },
					});
				}}
			>
				Save
			</button>
		</div>
	);
};

export default EditTask;
