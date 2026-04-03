const express = require('express');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));


app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/stats', require('./routes/stats'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});