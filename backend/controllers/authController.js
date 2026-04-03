const bcrypt = require('bcrypt');
const { readJSON } = require('../utils/file');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('users.json');

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

  res.json({ id: user.id, username: user.username, role: user.role });
};