import { useContext } from "react";
import { TasksContext, TasksDispatchContext } from "../TasksContext";
import { Task } from "../types";

interface TaskDisplayProps {
	id: Task["id"];
}

const HistoryTaskDisplay = ({ id }: TaskDisplayProps) => {
	const dispatch = useContext(TasksDispatchContext);
	const { history } = useContext(TasksContext) || {};

	const task = history?.find((task) => task.id === id)!;

	return (
		<div className="task-display">
			<div className={task.done ? "task-checked task-text" : "task-text"}>
				{task.text}
			</div>
		</div>
	);
};

export default HistoryTaskDisplay;
