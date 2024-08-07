import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/tasks', { text: newTask }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const toggleTaskCompletion = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks[index];
      const response = await axios.put(`/tasks/${task.id}`, { completed: !task.completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedTasks = tasks.map((task, i) =>
        i === index ? response.data : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks[index];
      await axios.delete(`/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="flex-grow px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button onClick={addTask} className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Task
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={task.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
              <span className={`flex-grow ${task.completed ? 'line-through' : ''}`}>
                {task.text}
              </span>
              <button onClick={() => toggleTaskCompletion(index)} className="px-2 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => deleteTask(index)} className="px-2 py-1 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
