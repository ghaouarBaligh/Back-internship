const express =require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const multer = require('multer');



router.post('/register',async(req,res)=>{

    data = req.body;
    usr = new User(data);
   
    salt = bcrypt.genSaltSync(10);
    cryptedPass= await bcrypt.hashSync(data.password,salt) 
    usr.password=cryptedPass;
   
    usr.save()
    .then(
        (savedUser)=>{
            res.status(200).send(savedUser)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})

router.post('/login',async(req,res)=>{

    data=req.body;
    user= await User.findOne({email : data.email})
    if (!user){
        res.status(404).send('email or password not valid')
    }else{
        validPass = bcrypt.compareSync(data.password, user.password)

        if(!validPass){
            res.status(401).send('email or password not valid')
        }else{
            payload={
                _id:user.id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign(payload,'123')
            res.status(200).send({mytoken:token})
        }
    }
})

module.exports = router;