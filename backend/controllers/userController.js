const bcrypt = require('bcrypt');
const { readJSON, writeJSON } = require('../utils/file');

exports.getUsers = (req, res) => {
  const users = readJSON('users.json');
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  const users = readJSON('users.json');

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashed,
    role
  };

  users.push(newUser);
  writeJSON('users.json', users);

  res.json(newUser);
};

exports.updateUser = (req, res) => {
  const users = readJSON('users.json');
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  writeJSON('users.json', users);

  res.json(users[index]);
};

exports.deleteUser = (req, res) => {
  let users = readJSON('users.json');
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.role === 'admin') {
    return res.status(400).json({ message: 'Cannot delete admin' });
  }
};