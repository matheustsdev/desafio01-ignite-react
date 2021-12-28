import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleRandomId() {
    // Gera um número aleatório entre 0 e 100 diferente

    let id = Math.floor(Math.random() * 101);

    for (let i = 0; i <= tasks.length + 1; i++) {
      if (tasks.findIndex((task) => task.id === id) !== -1) {
        id = Math.floor(Math.random() * 101);
        i = 0;
      }
    }
    return id;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle === "") {
      alert("Insira um título para a tarefa");
    } else {
      const newTask: Task = {
        id: handleRandomId(),
        title: newTaskTitle,
        isComplete: false,
      };

      const updatedTaskList = tasks.concat(newTask);

      return setTasks(updatedTaskList);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    let updatedTask = tasks.map((task: Task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      } else return task;
    });

    return setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const index = tasks.findIndex((task) => task.id === id);

    const updatedTaskList = tasks.filter((task) => task.id !== id);

    return setTasks(updatedTaskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
