import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { IoAdd } from "react-icons/io5";
import { FaSort } from "react-icons/fa6";
import { FaTasks, FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      setLoading(true); // Start loading
      const response = await fetch('http://localhost:8000/api/tasks');
      const data = await response.json();
      setTasks(data);
    }catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false); // Stop loading
    }    
  };

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(task => !sortStatus || sortStatus === 'All' || task.status === sortStatus);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 px-10">
      <div className="flex flex-col md:flex-row justify-between items-center text-zinc-200 mt-5 mb-12">
        <h2 className="flex text-2xl font-semibold mb-4 md:mb-0">
          <FaTasks className='w-5 h-5 mr-2 mt-2' /> Task List
        </h2>
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <div className="relative flex items-center mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks by title"
              className="pl-10 pr-4 py-2 rounded-full border border-zinc-500 bg-transparent text-white w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative mb-4 md:mb-0 md:mr-4" ref={dropdownRef}>
            <button
              className="flex bg-transparent border border-zinc-500 text-zinc-200 py-2 px-4 rounded"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Sort by <FaSort className='w-4 h-4 ml-2 mt-1' />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-black text-zinc-200 border border-zinc-500 font-semibold rounded shadow-lg z-10">
                {['To do', 'In Progress', 'Done', 'All'].map((status, index) => (
                    <React.Fragment key={status}>
                    {index === 3 && <hr className="border-gray-500" />} {/* Separator line */}
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                      onClick={() => {
                        setSortStatus(status);
                        setShowDropdown(false);
                      }}
                    >
                      {status}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          <button
            className=" hidden md:flex bg-white text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            <IoAdd className='text-black w-6 h-6 mr-2' />
            New Task
          </button>
        </div>
      </div>
      {showModal && (
        <TaskForm setShowModal={setShowModal} fetchTasks={fetchTasks} />
      )}
      {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader"></div>
          </div>
       ): filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-zinc-500 h-3/5">
          <div className='rounded-full p-5 mb-4 mt-16 bg-eventgray'>
            <FaTasks className='w-9 h-9 text-gray-200'/>
          </div>
          <h3 className="text-xl text-white font-semibold mb-4">No tasks yet</h3>
          <p className="text-gray-200 text-center mb-8">
                Create new tasks to track your task! 
          </p>
          <button className="bg-white text-black font-semibold py-2 px-4 mb-5 rounded hover:bg-gray-200" onClick={() => setShowModal(true)}>
              Create
          </button>         
        </div>
      ) : ( 
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      )}
      <button
        className="fixed bottom-4 right-4 bg-white text-black rounded-full p-4 shadow-lg md:hidden"
        onClick={() => setShowModal(true)}
      >
        <IoAdd className='text-black w-6 h-6' />
      </button>
    </div>
  );
};

export default HomePage;
