const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/courseController');

router.get('/', ctrl.getCourses);
router.post('/', ctrl.createCourse);
router.put('/:id', ctrl.updateCourse);
router.put('/:id/grade', ctrl.updateGrade);

module.exports = router;