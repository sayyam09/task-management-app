import React, { useState } from 'react';

const TaskForm = ({ setShowModal, fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTask = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    }).then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
        console.log('Success:', data);
        fetchTasks(); // Refresh the task list
        setShowModal(false); // Close the modal after task creation
    }).catch(error => {
        console.error('Error:', error);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-lightgray p-6 rounded shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-2">New Task</h2>
        <p className='text-zinc-300 mb-4'>Task lists can help you stay organized & manage time.</p>
        <form onSubmit={createTask}>
          <label className="block text-white mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="e.g. clean my room, visit uncle"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mb-4 w-full border border-zinc-500 text-zinc-200 bg-transparent rounded-lg"
          />
          <label className="block text-white mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 mb-6 w-full border border-zinc-500 text-zinc-200 bg-transparent rounded-lg"
          ></textarea>
          <div className="flex justify-end">
            <button
              className="bg-transparent text-white font-semibold hover:bg-zinc-700 px-4 py-2 rounded mr-2"
              onClick={() => setShowModal(false)}
              type="button"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-white text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
