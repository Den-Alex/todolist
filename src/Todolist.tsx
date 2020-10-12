import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";



export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required")
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => {
                            props.removeTasks(t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }

                        return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onActiveClickHandler}>Completed</button>
            </div>
        </div>
    )
}