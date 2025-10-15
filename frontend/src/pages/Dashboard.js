import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

function Dashboard() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    const res = await axios.get('http://localhost:5000/api/entities', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  }, [token]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleCreate = async () => {
    await axios.post('http://localhost:5000/api/entities', { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle('');
    fetchTasks();
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>Tasks</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={handleCreate}>Add Task</button>
      <ul>
        {tasks.map(task => (<li key={task.id}>{task.title}</li>))}
      </ul>
    </div>
  );
}

export default Dashboard;
