const express=require('express');
const app=express();
const morgan=require('morgan');
const colors=require('colors');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB = require('./config/connect');
const path=require('path');
const port=process.env.PORT ||8080;
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());



app.use('/api/v1/users',require('./routes/userRoutes'));
app.use('/api/v1/blogs',require('./routes/blogRoutes'));


app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})


app.get('/',(req,res)=>{
    res.send('<h1>This is Default</h1>')
})

const start=async()=>{
    try{
        await connectDB(process.env.URI);
        app.listen(port,()=>{
            console.log(`The server is running on ${port}`.bgGreen);
        })
    }catch(error){
        console.log(error);
    }
}

start();