const mongoose = require('mongoose')
require('dotenv').config();
/*
mongoose.connect('mongodb://127.0.0.1:27017/app').then(
    ()=>{
        console.log('connected');
    }
)
.catch(
    (err)=>{
        console.log(err);
    }
)
*/
mongoose.connect('mongodb+srv://baligh_ghaouar:esudInoU7HMYVvEW@cluster0.wvspbku.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0').then(
    (conn)=>{
        console.log(`Database connected: ${conn.connection.host}`);
    }
)
.catch(
    (err)=>{
        console.error('Database Error: ${err}');
        process.exit(1);
    }
)

module.exports = mongoose;