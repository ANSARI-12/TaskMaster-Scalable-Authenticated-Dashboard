const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const entityRoutes = require('./routes/entityRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/entities', entityRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
