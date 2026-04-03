const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/stats', require('./routes/stats'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});