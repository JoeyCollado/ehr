/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Data Schema
const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  imageSrc: String
});

const Data = mongoose.model('Data', dataSchema);

// Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.findOne();
    res.json(data || { name: '', description: '', type: 'Option 1', imageSrc: '/skeleton.png' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/data', async (req, res) => {
  try {
    let data = await Data.findOne();
    if (!data) data = new Data(req.body);
    else data.set(req.body);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/