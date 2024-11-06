const express = require('express');

const mongoose = require('mongoose')
const cors = require('cors')



const port = 4005 || process.env.PORT;




const app = express();
app.use(express.json())
app.use(cors());

//mongodb connection
mongoose.connect("mongodb+srv://msrinivasreddy5454:Srinivas9189@cluster0.tz1obml.mongodb.net/PFXwatch?retryWrites=true&w=majority")
.then(()=>console.log('DB Connected'))
.catch((error)=>console.log('DB not connected'))


app.use('/',require('./auth'))


app.listen(port,()=>{
    console.log(`server running at ${port}`)
})



