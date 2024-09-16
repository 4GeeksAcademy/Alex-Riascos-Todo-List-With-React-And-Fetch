import React from "react";
import TodoList from "./todoList";



//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-pink display-1">todos</h1>
			<TodoList />
		</div>
	)
};

export default Home;
