const db = require("../config/db");

//get all students list
const getStudents = async (req,res) => {
    try {

        const data = await db.query('SELECT * FROM student');
        if(!data){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Student Records Fetched Successfully",
            totalStudents: data[0].length,
            data: data[0]
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting students information',
            error
        });
    }
}

//get student by id
const getStudentById = async (req,res) => {
    try {

        const studentId = req.params.id;
        if(!studentId){
            return res.status(500).send({
                success:false,
                message:"Student id is required"
            });
        }
        const data = await db.query(`SELECT * FROM student WHERE id = ? `, [studentId]);

        const isEmpty = Object.keys(data[0]).length == 0;

        if(!data || isEmpty){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Student Record Fetched Successfully",
            data: data[0]
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting student information',
            error
        });
    }
}

//create student 
const createStudent = async (req,res) => {
    try {

        const body = req.body;

        if(!body || !body.name || !body.roll_no || !body.class || !body.medium){
             return res.status(500).send({
                success:false,
                message:"All fields are required"
            });
        }
        
        const data = await db.query(`INSERT INTO student (name, roll_no, class, medium) VALUES (?, ?, ?, ?) `, [body.name, body.roll_no, body.class, body.medium]);
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Failed to insert new record"
            });
        }
        res.status(200).send({
            success: true,
            message: "New record insert Successfully",
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error inserting student information',
            error
        });
    }
}


//delete student 
const deleteStudentById = async (req,res) => {
    try {

        const studentId = req.params.id;
        if(!studentId){
            return res.status(500).send({
                success:false,
                message:"Student id is required"
            });
        }

        const found = await db.query(`SELECT * FROM student WHERE id = ? `, [studentId]);

        const isEmpty = Object.keys(found[0]).length == 0;

        if(!found || isEmpty){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        const data = await db.query(`DELETE FROM student WHERE id = ? `, [studentId]);

        if(!data){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Student Record Deleted Successfully",
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Deleting student information',
            error
        });
    }
}

//update student 
const updateStudentId = async (req,res) => {
    try {

        const studentId = req.params.id;
        if(!studentId){
            return res.status(500).send({
                success:false,
                message:"Student id is required"
            });
        }

        const found = await db.query(`SELECT * FROM student WHERE id = ? `, [studentId]);

        const isEmpty = Object.keys(found[0]).length == 0;

        if(!found || isEmpty){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        const newName = req.body.name ?? found[0].name;
        const newRollNumber = req.body.roll_no ?? found[0].roll_no;
        const newClass = req.body.class ?? found[0].class;
        const newMedium = req.body.medium ?? found[0].medium;

        const data = await db.query(`UPDATE student SET name = ?, roll_no = ?, class = ?, medium = ? WHERE id = ? `, [newName, newRollNumber, newClass, newMedium, studentId]);

        if(!data){
            return res.status(404).send({
                success:false,
                message:"No Records found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Student Record Updated Successfully",
        });
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Updating student information',
            error
        });
    }
}



module.exports = {getStudents, getStudentById, createStudent, deleteStudentById, updateStudentId}