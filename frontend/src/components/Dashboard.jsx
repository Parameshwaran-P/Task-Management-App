import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Ensure this is correctly configured

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks on component mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', { task: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleAddTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="px-3 py-2 border rounded"
          placeholder="Add a new task"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="p-2 border-b">
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
