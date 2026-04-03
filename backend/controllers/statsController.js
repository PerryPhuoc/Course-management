const { readJSON } = require('../utils/file');

exports.getStats = (req, res) => {
  const users = readJSON('users.json');
  const courses = readJSON('courses.json');
  const enrollments = readJSON('enrollments.json');

  const roleStats = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const semesterStats = enrollments.reduce((acc, e) => {
    acc[e.semester] = (acc[e.semester] || 0) + 1;
    return acc;
  }, {});

  res.json({
    usersByRole: roleStats,
    totalCourses: courses.length,
    enrollmentsBySemester: semesterStats
  });
};
