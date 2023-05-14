/// <reference types="react-scripts" />

import { uniqueId } from "lodash";
import { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TasksContext, TasksDispatchContext } from "../TasksContext";
import TaskRow from "./TaskRow";

const TaskList = () => {
	const dispatch = useContext(TasksDispatchContext);
	const { tasks } = useContext(TasksContext) || {};

	return (
		<Droppable droppableId={uniqueId("droppable-")}>
			{(provided) => (
				<div
					className="task-list"
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{tasks?.map((task, index) => (
						<TaskRow id={task.id} index={index}></TaskRow>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default TaskList;
