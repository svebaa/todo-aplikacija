import { TaskState, Action, TaskActionType } from "./types";

export function tasksReducer(state: TaskState, action: Action): TaskState {
	const { payload, type } = action;
	switch (type) {
		case TaskActionType.ADD:
			state = {
				tasks: [
					...state.tasks,
					{
						...payload,
						done: false,
					},
				],
				history: [...state.history],
			};
			break;
		case TaskActionType.DELETE:
			state = {
				tasks: state.tasks.filter((task) => task.id !== payload.id),
				history: [...state.history],
			};
			break;
		case TaskActionType.TOGGLE:
			state = {
				tasks: state.tasks.map((task) => {
					if (task.id === payload.id) {
						return {
							...task,
							done: payload.done,
						};
					}
					return task;
				}),
				history: [...state.history],
			};
			break;
		case TaskActionType.EDIT_TEXT:
			state = {
				tasks: state.tasks.map((task) => {
					if (task.id === payload.id) {
						return {
							...task,
							text: payload.text,
						};
					}
					return task;
				}),
				history: [...state.history],
			};
			break;
		case TaskActionType.CHANGE_EDITING:
			state = {
				tasks: state.tasks.map((task) => {
					if (task.id === payload.id) {
						return {
							...task,
							editing: !payload.editing,
						};
					}
					return task;
				}),
				history: [...state.history],
			};
			break;
		case TaskActionType.ADD_TO_HISTORY:
			const task = state.tasks.find((task) => task.id === payload.id)!;

			state = {
				history: [...state.history, task],
				tasks: state.tasks.filter((task) => task.id !== payload.id),
			};
			break;
		case TaskActionType.DELETE_FROM_HISTORY:
			state = {
				history: state.history.filter((task) => task.id !== payload.id),
				tasks: [...state.tasks],
			};
			break;
		default:
			return state;
	}

	localStorage.setItem("tasks", JSON.stringify(state.tasks));
	localStorage.setItem("history", JSON.stringify(state.history));

	return state;
}
