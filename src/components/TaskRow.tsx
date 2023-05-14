import { useContext, useEffect } from "react";
import { Task, TaskActionType } from "../types";
import { TasksDispatchContext, TasksContext } from "../TasksContext";
import EditTask from "./EditTask";
import TaskDisplay from "./TaskDisplay";
import { Draggable } from "react-beautiful-dnd";

interface TaskRowProps {
	id: Task["id"];
	index: number;
}

const TaskRow = ({ id, index }: TaskRowProps) => {
	const dispatch = useContext(TasksDispatchContext);
	const { tasks, history } = useContext(TasksContext) || {};

	const task = tasks?.find((task) => task.id === id)!;

	useEffect(() => {
		console.log(history);
	}, [history, tasks]);

	return (
		<Draggable draggableId={id} index={index} key={id}>
			{(provided) => (
				<div
					className="task-row"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<input
						type="checkbox"
						className="check-box"
						onChange={() => {
							dispatch?.({
								type: TaskActionType.TOGGLE,
								payload: {
									...task,
									done: !task.done,
								},
							});

							setTimeout(() => {
								dispatch?.({
									type: TaskActionType.ADD_TO_HISTORY,
									payload: {
										...task,
									},
								});
							}, 1000);
						}}
					></input>
					{!task.editing ? (
						<TaskDisplay id={task.id}></TaskDisplay>
					) : (
						<EditTask id={task.id}></EditTask>
					)}
				</div>
			)}
		</Draggable>
	);
};

export default TaskRow;
