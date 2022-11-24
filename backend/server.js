const express = require('express');
 require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require ('cors')
const connectDB = require('./config/db')
app = express();
const colors = require('colors')
connectDB();
const port = process.env.PORT || 8000
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.listen(process.env.PORT, ()=>{
    console.log(`runnig server on port ${process.env.PORT}`.magenta);
})

app.use("/api/goals",require('./routes/goalRoutes'));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
