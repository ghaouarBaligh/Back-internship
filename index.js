const express = require('express');
const UserRoute = require('./routes/user.js');
const VideoRoute = require('./routes/video.js');
require('./config/connect.js');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();
const app = express();
app.use(express.json())

mongoose.connect('mongodb+srv://baligh_ghaouar:baligh27169335@cluster0.wvspbku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

//http://127.0.0.1:3000/

app.use('/user', UserRoute);
app.use('/upload', VideoRoute);

app.use('/getupload',express.static('./uploads'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('server work !!!'); 
});