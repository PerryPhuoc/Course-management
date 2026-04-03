const { readJSON, writeJSON } = require('../utils/file');

exports.getCourses = (req, res) => {
  res.json(readJSON('courses.json'));
};

exports.createCourse = (req, res) => {
  const courses = readJSON('courses.json');
  const newCourse = { id: Date.now(), ...req.body };

  courses.push(newCourse);
  writeJSON('courses.json', courses);

  res.json(newCourse);
};

exports.updateCourse = (req, res) => {
  const courses = readJSON('courses.json');
  const id = Number(req.params.id);

  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  courses[index] = { ...courses[index], ...req.body };
  writeJSON('courses.json', courses);

  res.json(courses[index]);
};

exports.updateGrade = (req, res) => {
  const grades = readJSON('grades.json');
  const { studentId, grade } = req.body;
  const courseId = Number(req.params.id);

  const existing = grades.find(g => g.studentId === studentId && g.courseId === courseId);

  if (existing) {
    existing.grade = grade;
  } else {
    grades.push({ studentId, courseId, grade });
  }

  writeJSON('grades.json', grades);
  res.json({ message: 'Grade updated' });
};