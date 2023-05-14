import { useReducer, useState } from "react";
import { DragDropContext, DragUpdate, DropResult } from "react-beautiful-dnd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TasksContext, TasksDispatchContext } from "./TasksContext";
import History from "./pages/History";
import Home from "./pages/Home";
import { tasksReducer } from "./reducer";
import { Task, TaskState } from "./types";

const INITIAL_STATE: TaskState = {
	tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
	history: JSON.parse(localStorage.getItem("history") || "[]"),
};

const App = () => {
	const [state, dispatch] = useReducer(tasksReducer, INITIAL_STATE);
	const [visitingHistory, setVisitingHistory] = useState(false);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination || !source || destination.index === source.index) {
			return;
		}

		[state.tasks[source.index], state.tasks[destination.index]] = [
			state.tasks[destination.index],
			state.tasks[source.index],
		];
	};

	const onDragUpdate = (update: DragUpdate) => {
		console.log(update);
	};

	return (
		<BrowserRouter>
			<TasksContext.Provider value={state}>
				<TasksDispatchContext.Provider value={dispatch}>
					<Routes>
						<Route
							path="/"
							element={
								<DragDropContext
									onDragEnd={onDragEnd}
									onDragUpdate={onDragUpdate}
								>
									<Home></Home>
								</DragDropContext>
							}
						></Route>
						<Route
							path="/history"
							element={<History></History>}
						></Route>
					</Routes>
				</TasksDispatchContext.Provider>
			</TasksContext.Provider>
		</BrowserRouter>
	);
};

export default App;
