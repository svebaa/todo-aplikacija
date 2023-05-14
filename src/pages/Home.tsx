import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import checkedIcon from "../icons/checked.svg";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="App">
			<div className="wrapper">
				<div className="header">
					<h1 className="title" style={{ marginRight: "10px" }}>
						Todo App
					</h1>
					<img
						alt="checked-icon"
						src={checkedIcon}
						className="checked-icon"
						onClick={() => navigate("/history")}
					></img>
				</div>
				<AddTask></AddTask>
				<TaskList></TaskList>
			</div>
		</div>
	);
};

export default Home;
