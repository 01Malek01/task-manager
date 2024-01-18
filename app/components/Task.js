import React, { useEffect, useState } from "react";
// import { useForm,} from "react-hook-form";

function Task({ task, deleteTask, complete, setTasks, tasks }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm();

  const handleSaveEdit = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? editedTask : t)));
    setEditing(false);
  };
  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTask(task);
  };
  const content = !editing ? (
    <div
      className={`card w-[100%] md:w-[94%] ${
        task.isCompleted ? "bg-green-600" : "bg-blue-600"
      } text-primary-content my-5 mx-auto `}
    >
      <div className="card-body">
        <h2 className="card-title">{task.name}</h2>
        <p>{task.description}</p>
        <div className="card-actions justify-center items-center md:justify-end">
          <button
            className="btn hover:bg-green-600"
            onClick={() => {
              complete(task);
            }}
          >
            Mark As Completed
          </button>
          <button
            className="btn hover:bg-blue-600"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn hover:bg-red-600"
            onClick={() => deleteTask(task)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="taskAddForm flex items-center justify-center flex-col lg:flex-row gap-4">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Edit Task Name</span>
        </div>
        <input
          onChange={(e) =>
            setEditedTask({ ...editedTask, name: e.target.value })
          }
          type="text"
          placeholder="Edit task name here"
          className="input input-bordered w-full max-w-xs"
          // value={editedTask.name}
          // {...register("name", {
          //   required: "A task name cannot be empty",
          //   minLength: {
          //     value: 3,
          //     message: "Task name must be at least 3 characters",
          //   },
          // })}
        />
        {/* {errors.name && <p className="text-red-600">{errors.name.message}</p>} */}
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Edit task description</span>
        </div>
        <input
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          type="text"
          placeholder="Edit task description here"
          className="input input-bordered w-full max-w-xs"
          // {...register("description")}
        />
      </label>

      <button
        role="submit"
        onClick={() => handleSaveEdit(task)}
        className="btn btn-primary lg:mt-[36px]"
      >
        save
      </button>
      <button
        className="btn btn-secondary lg:mt-[36px]"
        onClick={handleCancelEdit}
      >
        Cancel
      </button>
    </div>
  );

  return content;
}

export default Task;
