require('dotenv').config();

const sqlPool = require('./config/db');
const express = require('express');
const morgan = require('morgan');
const studentRouter = require('./routes/students_route');

const app = express();

//middlewares
app.use(express.json())
app.use(morgan('dev'));

app.use('/api/student/', studentRouter)

//routes
app.get('/test', (req, res) => {
    res.status(200).send({ 'message': 'Welcome to Nodejs Server' })
})

const PORT = process.env.PORT || 3000;

//conditionally listen
sqlPool.query('SELECT 1').then(() => {
    console.log(`MySQL DB Connected.`);
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
}).catch((e) => console.log(`error connecting db ${e}`));

