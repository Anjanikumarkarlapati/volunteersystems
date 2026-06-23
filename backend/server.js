const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const communicationRoutes = require('./routes/communicationRoutes');
const activityRoutes = require('./routes/activityRoutes');

connectDB();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/shifts', require('./routes/shiftRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/training', require('./routes/trainingRoutes'));
app.use('/api/communications', communicationRoutes);
app.use('/api/activities', activityRoutes);


app.get('/', (req, res) => {
  res.send('Backend Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});