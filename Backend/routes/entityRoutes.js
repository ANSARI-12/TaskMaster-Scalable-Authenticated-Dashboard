const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/jwt');

router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', auth, (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (user_id, title) VALUES (?, ?)', [req.user.id, title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title });
  });
});

router.put('/:id', auth, (req, res) => {
  const { title } = req.body;
  db.query('UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?', [title, req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated' });
  });
});

router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
