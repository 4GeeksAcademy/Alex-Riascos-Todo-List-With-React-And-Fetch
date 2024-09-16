import React, { useState, useEffect } from "react";
import Task from "./task";

const TodoList = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [userName, setUserName] = useState("");
    const [isUserSet, setIsUserSet] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

    //GET
    const loadTask = async () => {
        const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
        if (response.ok) {
            const data = await response.json();
            setTaskList(data.todos);
            setErrorMessage(""); // Limpiar mensaje de error si la carga es exitosa
            return true; // Indica que la carga fue exitosa
        } else {
            setTaskList([]); // Limpiar la lista de tareas si el usuario no existe
            setErrorMessage("El nombre de usuario no existe."); // Establecer mensaje de error
            return false; // Indica que la carga falló
        }
    };

    //POST
    const createTask = async () => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
            method: 'POST',
            body: JSON.stringify({
                label: newTask,
                is_done: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            loadTask();
            setNewTask("");
        } else {
            console.error("Error al agregar la tarea:", response.statusText);
        }
    };

    // DELETE individual task
    const deleteTask = async (todoID, indice) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setTaskList(taskList.filter((_tarea, indiceABorrar) => indice !== indiceABorrar));
        }
    };

    // Clear all tasks
    const clearTasks = async () => {
        const tasksToDelete = [...taskList];
        for (const tarea of tasksToDelete) {
            await deleteTask(tarea.id);
        }
        setTaskList([]);
    };

    const handleUserSubmit = async () => {
        if (userName.trim() !== "") {
            const isValidUser = await loadTask(); // Cargar tareas para verificar si el usuario existe
            if (isValidUser) {
                setIsUserSet(true); // Solo establecer el usuario si hay tareas
            }
        }
    };

    return (
        <div className="container bg-white rounded-0">
            {!isUserSet ? (
                <div>
                    <input
                        className="col-12 px-5 form-control rounded-0"
                        type="text"
                        value={userName}
                        placeholder="Enter your username"
                        onChange={(event) => setUserName(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                handleUserSubmit();
                            }
                        }}
                    />
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleUserSubmit}
                    >
                        Set Username
                    </button>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Mostrar mensaje de error */}
                </div>
            ) : (
                <div>
                    <input
                        className="col-12 px-5 form-control rounded-0"
                        type="text"
                        value={newTask}
                        placeholder={taskList.length === 0 ? "No tasks, add a task?" : "What needs to be done?"}
                        onChange={(event) => setNewTask(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter" && newTask.trim() !== "") {
                                createTask();
                            }
                        }}
                    />

                    {taskList.map((tarea, indice) => (
                        <Task
                            task={tarea}
                            key={indice}
                            onRemove={() => {
                                deleteTask(tarea.id, indice);
                            }}
                        />
                    ))}

                    <p className="border text-start px-5">{taskList.length} items left</p>
                    <button
                        className="btn btn-danger mt-2"
                        onClick={clearTasks}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoList;


