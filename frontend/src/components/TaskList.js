import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <div className="task-list mt-8">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
