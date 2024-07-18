import React, { useState, useEffect, useRef } from 'react';
import { SlGlobe } from "react-icons/sl";
import { LuAlertTriangle } from "react-icons/lu";
import { SiGoogletasks } from "react-icons/si";
import { RiProgress5Line } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const TaskItem = ({ task, fetchTasks }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  const updateTaskStatus = async (status) => {
    console.log("\n selected status to update : ", status);
    await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    setSuccessMessage(`${task.title}`+" task status updated successfully");
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
    fetchTasks();
  };

  const deleteTask = async () => {
    await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'To do':
        return 'bg-violet-500 text-white border border-violet-500';
      case 'In Progress':
        return 'bg-yellow-500 text-white border border-yellow-500';
      case 'Done':
        return 'bg-green-500 text-white border border-green-500';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'To do':
        return <IoDocumentTextOutline className="w-4 h-4 mr-1" />;
      case 'In Progress':
        return <RiProgress5Line className="w-4 h-4 mr-1" />;
      case 'Done':
        return <SiGoogletasks className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const statusOptions = () => {
    if (task.status === 'To do') {
      return ['In Progress', 'Done'];
    } else if (task.status === 'In Progress') {
      return ['Done'];
    } else {
      return [];
    }
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeDeleteModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className=''>
      <div className="task-item bg-transparent p-4 mb-2 rounded text-zinc-200 border border-zinc-500 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col max-w-8/12">
          <div className="flex items-center mb-2 w-fit">
            <h3 className="text-xl text-white">{task.title}</h3>
            <p className={`ml-3 border p-1 px-2 rounded-sm text-sm font-semibold flex items-center ${getStatusClasses(task.status)}`}>
              {getStatusIcon(task.status)} {task.status}
            </p>
          </div>
          <p>{task.description}</p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          {task.status !== 'Done' && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex bg-transparent border border-zinc-500 text-white py-1 px-2 rounded mr-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <SlGlobe className='w-4 h-4 mr-2 mt-1'/>
                Change Status
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black text-zinc-200 border border-zinc-500 font-semibold rounded shadow-lg z-10">
                  {statusOptions().map((status) => (
                    <button
                      key={status}
                      className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                      onClick={() => {
                        updateTaskStatus(status);
                        setShowDropdown(false);
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            className="bg-transparent hover:bg-red-800 text-white py-2 px-2 border border-zinc-500 rounded flex items-center"
            onClick={openDeleteModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-5 h-5'>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeDeleteModal}>
            <div className="bg-lightgray p-8 rounded-md shadow-lg w-11/12 max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="flex text-xl font-bold mb-4 tracking-normal">
                <div className='p-2 rounded-full mr-3 bg-red-800'>
                  <LuAlertTriangle className='w-4 h-4 '/>
                </div>
                Delete Task?
              </h2>
              <p className="mb-2 text-gray-300 ml-11">This will delete <span className="font-semibold text-white">{task.title}</span>.</p>
              <p className="mb-6 text-gray-300 ml-11">Are you sure you want to delete this task?</p>
              <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 bg-transparent text-white hover:bg-zinc-700 rounded-md" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 font-semibold rounded-md" onClick={() => { deleteTask(); closeDeleteModal(); }}>
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {successMessage && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-5 py-2 bg-white text-black font-semibold rounded-lg shadow-lg flex items-center space-x-2">
          <FaCheck />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
    
  );
};

export default TaskItem;


