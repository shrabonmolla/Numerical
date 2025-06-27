const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve uploaded images

// MongoDB connection
mongoose.connect('mongodb+srv://bongshi19:bongshi19@cluster0.xjqnh.mongodb.net/bongshi19?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Member Schema (with photo field)
const memberSchema = new mongoose.Schema({
  name: String,
  photo: String // file path or URL
}, { collection: 'members' });

const Member = mongoose.model('Member', memberSchema);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST: Add member
app.post('/api/member', async (req, res) => {
  const member = new Member({ name: req.body.name });
  const saved = await member.save();
  res.json(saved);
});

// GET: All members
app.get('/api/member', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});


// PUT: Update photo
app.put('/api/member/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      { photo: req.file.path },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update photo', error: err.message });
  }
});



// Start server
app.listen(3000, () => {
  console.log('API running at http://localhost:3000');
});
