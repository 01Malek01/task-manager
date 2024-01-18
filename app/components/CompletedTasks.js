import React from "react";

function CompletedTasks({ completedTasks, completedTask,setCompletedTasks }) {
  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <td>{completedTask.name}</td>
        <td>{completedTask.description}</td>
        <td>{completedTask.completedAt}</td>
        <td><button className="btn btn-error" onClick={() => setCompletedTasks(completedTasks.filter((t) => t.id !== completedTask.id))}>Delete</button></td>
      </tr>
    </tbody>
  );
}

export default CompletedTasks;
