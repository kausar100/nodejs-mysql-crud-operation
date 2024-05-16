const express = require('express');
const { getStudents, getStudentById, createStudent, deleteStudentById, updateStudentId } = require('../controllers/student_controller');

const router = express.Router();

//routes

router.get('/getAll', getStudents);


router.get('/:id', getStudentById);

router.post('/create', createStudent);

router.delete('/:id', deleteStudentById);

router.put('/:id', updateStudentId);


module.exports = router