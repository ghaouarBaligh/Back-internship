const express =require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');


console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

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


const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
router.post('/forget-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Generate a new password
        const newPassword = crypto.randomBytes(8).toString('hex');

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Send an email with the new password
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error); // Log the error
                return res.status(500).send('Error sending email');
            }
            res.send('Password reset email sent');
        });
    } catch (error) {
        console.error('Internal Server Error:', error); // Log the error
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router;