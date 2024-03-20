const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.routes');
const { auth } = require('./middleware/auth.middleware');
const { noteRouter } = require('./routes/notes.routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", noteRouter);
const port = process.env.port;

app.get("/", auth, async(req,res)=>{
    res.json('Home')
})

app.listen(port, async()=>{
    try {
        await connection
        console.log('connected to database');
        console.log(`server is running at port ${port}`)
    } catch (error) {
        console.log(error)
    }
})