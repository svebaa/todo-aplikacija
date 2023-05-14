export interface TaskState {
	tasks: Task[];
	history: Task[];
}

export interface Task {
	id: string;
	text: string;
	done: boolean;
	editing: boolean;
}

export enum TaskActionType {
	ADD = "ADD",
	TOGGLE = "TOGGLE",
	DELETE = "DELETE",
	EDIT_TEXT = "EDIT_TEXT",
	CHANGE_EDITING = "CHANGE_EDITING",
	ADD_TO_HISTORY = "ADD_TO_HISTORY",
	DELETE_FROM_HISTORY = "DELETE_FROM_HISTORY",
}

export interface Action {
	type: TaskActionType;
	payload: Task;
}
