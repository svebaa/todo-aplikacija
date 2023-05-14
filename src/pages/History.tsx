import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { TasksContext, TasksDispatchContext } from "../TasksContext";
import HistoryTaskDisplay from "../components/HistoryTaskDisplay";
import BackIcon from "../icons/back.svg";
import { TaskActionType } from "../types";

const History = () => {
	const dispatch = useContext(TasksDispatchContext);
	const { history } = useContext(TasksContext) || {};
	const navigate = useNavigate();

	return (
		<div className="App">
			<div className="wrapper">
				<div className="header">
					<img
						src={BackIcon}
						onClick={() => navigate("/")}
						alt="back-icon"
						className="back-icon"
					></img>
					<h1 style={{ marginLeft: "10px" }}>History</h1>
				</div>
				<div className="task-list">
					{history?.map((task, index) => (
						<div className="task-row">
							<input
								type="checkbox"
								className="check-box"
								defaultChecked={task.done}
								onChange={() => {
									dispatch?.({
										type: TaskActionType.DELETE_FROM_HISTORY,
										payload: {
											...task,
										},
									});

									dispatch?.({
										type: TaskActionType.ADD,
										payload: {
											...task,
										},
									});
								}}
							></input>
							<HistoryTaskDisplay
								id={task.id}
							></HistoryTaskDisplay>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default History;
