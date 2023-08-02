const express =require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose =require('mongoose');
const authRoute=require('./routes/auths');
const usersRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const jwt = require('jsonwebtoken');


dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(console.log('connected to Database'))
.catch(err=> console.log(err));


app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/post',postRoute);

   
app.listen(4222,()=>{
    console.log ('server has been started !');
});