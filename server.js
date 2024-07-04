const express = require('express');
const UserRoute = require('./routes/user');
const VideoRoute = require('./routes/video.js');
require('./config/connect');

const app = express();
app.use(express.json())

//http://127.0.0.1:3000/

app.use('/user', UserRoute);
app.use('/upload', VideoRoute);

app.use('/getupload',express.static('./uploads'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('server work !');
});