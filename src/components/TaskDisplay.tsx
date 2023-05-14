import { useContext } from "react";
import { TasksDispatchContext, TasksContext } from "../TasksContext";
import { Task, TaskActionType } from "../types";
import deleteIcon from "../icons/delete.svg";
import editIcon from "../icons/edit.svg";

interface TaskDisplayProps {
	id: Task["id"];
}

const TaskDisplay = ({ id }: TaskDisplayProps) => {
	const dispatch = useContext(TasksDispatchContext);
	const { tasks } = useContext(TasksContext) || {};

	const task = tasks?.find((task) => task.id === id)!;

	return (
		<div className="task-display">
			<div className={task.done ? "task-checked task-text" : "task-text"}>
				{task.text}
			</div>
			<div>
				<img
					onClick={() => {
						dispatch?.({
							type: TaskActionType.CHANGE_EDITING,
							payload: { ...task },
						});
					}}
					className="edit-icon"
					alt="edit-icon"
					src={editIcon}
				/>
				<img
					onClick={() =>
						dispatch?.({
							type: TaskActionType.DELETE,
							payload: task,
						})
					}
					className="delete-icon"
					alt="delete-icon"
					src={deleteIcon}
				/>
			</div>
		</div>
	);
};

export default TaskDisplay;
