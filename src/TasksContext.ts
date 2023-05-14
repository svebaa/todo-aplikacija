import { createContext } from "react";
import { Action, TaskState } from "./types";

export const TasksContext = createContext<TaskState | null>(null);
export const TasksDispatchContext =
	createContext<React.Dispatch<Action> | null>(null);
