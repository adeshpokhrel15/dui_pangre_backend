const express=require('express');
// const { get, connect } = require('mongoose');
const errorHandler = require('./middleware/errorhandler');
const connectionDb = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const http = require('http');
const dotenv= require('dotenv').config();
const cors = require('cors');
const adminRouter = require('./routes/admin_router');



const app =express();
const port=process.env.PORT|| 3000;



app.use(cors());

app.use(express.json()); 
connectionDb(); 


// api route is here 
app.use('/api/bikeinfo',require("./routes/bikeinfoRoutes"));
app.use('/api/requested-vehicles',require("./routes/vehicleRequestRoutes"));

// app.use((req, res) => {
//     res.status(404).send('Hello, World!');
//   });


app.use('/api/users', require("./routes/userRoutes"));
// app.use('/api/category', require("./routes/categoryRoutes"));
 app.use(errorHandler);

app.use('/admin',adminRouter);




app.listen(port,()=>{
    console.log(` server running on the port ${port} `);
})
