import { useContext, useState } from "react";
import { Task, TaskActionType } from "../types";
import { uniqueId } from "lodash";
import { TasksDispatchContext } from "../TasksContext";

const AddTask = () => {
	const [text, setText] = useState<Task["text"]>("");
	const dispatch = useContext(TasksDispatchContext);

	return (
		<div className="input-area">
			<input
				type="text"
				placeholder="Add a new todo"
				className="styled-input"
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				className="styled-button"
				onClick={() =>
					dispatch?.({
						type: TaskActionType.ADD,
						payload: {
							id: uniqueId(),
							text: text,
							done: false,
							editing: false,
						},
					})
				}
			>
				Add
			</button>
		</div>
	);
};

export default AddTask;
