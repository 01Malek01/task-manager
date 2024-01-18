'use client'
import React, { useEffect, useRef, useState } from "react";
import Task from "./Task";
import CompletedTasks from "./CompletedTasks";
import formatDateTime from "@/public/utils/dateFormatter";
import generateRandomKey from "@/public/utils/generateRandomKey";
import dynamic from "next/dynamic";

// const Task = dynamic(() => import("./Task"), { ssr: false });
function TasksList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tasks")
        : null;
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompletedTasks =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("completedTasks")
        : null;
    return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
  });
  const [showCompleted, setShowCompleted] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
  }, [completedTasks]);
  const handleAdd = () => {
    nameRef.current.value
      ? setTasks([
          ...tasks,
          {
            id: generateRandomKey(),
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            isCompleted: false,
          },
        ])
      : alert("Please enter a task name");

    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };
  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };
  const handleCompleted = (task) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
    setCompletedTasks([
      ...completedTasks,
      {
        ...task,
        completedAt: formatDateTime(Date.now()),
      },
    ]);
    setTimeout(() => {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }, 500);
  };

  return (
    <>
      <div className="taskAddForm flex items-center justify-center flex-col lg:flex-row gap-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Task Name</span>
          </div>
          <input
            ref={nameRef}
            type="text"
            placeholder="Task name here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Task Description</span>
          </div>
          <input
            ref={descriptionRef}
            type="text"
            placeholder="Task description here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn btn-primary lg:mt-[36px]" onClick={handleAdd}>
          Add Task
        </button>
      </div>
      <div className="showCompleted flex items-center justify-center mt-10">
        <button
          className="btn btn-info "
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </button>
      </div>

      <div className="taskList-wrapper mt-20">
        <div className="taskList">
          {!showCompleted ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                deleteTask={handleDelete}
                complete={handleCompleted}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))
          ) : completedTasks.length === 0 ? (
            <div className="flex items-center justify-center">
              <h1 className="text-[28px]">There are no completed tasks yet.</h1>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto bg-slate-500 m-3 rounded-lg text-white">
                <table className="table table-zebra">
                  {/* head */}
                  <thead className="text-slate-300  md:text-[16px]">
                    <tr className="mt-4">
                      <th>TASK NAME</th>
                      <th>TASK DESCRIPTION</th>
                      <th>COMPLETED AT</th>
                    </tr>
                  </thead>
                  {completedTasks.map((completedTask) => (
                    <CompletedTasks
                      key={completedTask.id}
                      completedTask={completedTask}
                      completedTasks={completedTasks}
                      setCompletedTasks={setCompletedTasks}
                    />
                  ))}
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TasksList;
