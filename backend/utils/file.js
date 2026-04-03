const fs = require('fs');
const path = require('path');

const readJSON = (file) => {
  const data = fs.readFileSync(path.join(__dirname, '../data', file));
  return JSON.parse(data);
};

const writeJSON = (file, data) => {
  fs.writeFileSync(
    path.join(__dirname, '../data', file),
    JSON.stringify(data, null, 2)
  );
};

module.exports = { readJSON, writeJSON };