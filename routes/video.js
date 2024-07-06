/*const express =require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user.js');
const Video = require('../models/video.js');
const jwt = require('jsonwebtoken')
//const authMiddleware = require('../middlewares/authMiddleware');

const multer = require('multer');

filename=''

const storage = multer.diskStorage({
    destination: './uploads',
    filename:(req,file,redirect)=>{
        let date= Date.now();
        let fl= date + '.' + file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})

//const upload = multer({storage: mystorage})

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },  // Limite la taille du fichier (ici 100MB)
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed!'));
      }
    }
  }).single('video');  // Définit le nom du champ pour le fichier vidéo


// Route POST pour l'upload de vidéos
router.post('/uploadd/:id', (req, res) => {
    const id = req.body._id;  // Assure-toi que l'ID utilisateur est inclus dans la requête
    console.log('UserId:', id);
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
      }
  
      // Enregistre les détails de la vidéo dans la base de données
      try {
        const newVideo = new Video({
          user: userId,
          name: req.file.filename,  // Utilise le nom du fichier comme nom de la vidéo
          uploadDate: Date.now()
        });
        await newVideo.save();
  
        res.status(200).json({ message: 'File uploaded successfully', video: newVideo });
      } catch (error) {
        res.status(500).json({ message: 'Error saving video details', error });
      }
    });
  });
  
  // Route GET pour récupérer toutes les vidéos
  router.get('/videos', async (req, res) => {
    try {
      const videos = await Video.find().populate('user', 'username');  // Populate pour récupérer les détails de l'utilisateur si nécessaire
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching videos', error });
    }
  });
  


module.exports = router;*/
/*const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.js');
const Video = require('../models/video.js');
const jwt = require('jsonwebtoken');
// const authMiddleware = require('../middlewares/authMiddleware');

const multer = require('multer');

let filename = '';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        cb(null, fl);
        filename = fl;
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },  // Limite la taille du fichier (ici 100MB)
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'));
        }
    }
}).single('video');  // Définit le nom du champ pour le fichier vidéo

// Route POST pour l'upload de vidéos
router.post('/uploadd', (req, res) => {
    const id = req.body.id;  // Assure-toi que l'ID utilisateur est inclus dans la requête
    console.log('UserId:', id);

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        // Enregistre les détails de la vidéo dans la base de données
        try {
            const newVideo = new Video({
                user: userId,
                name: req.file.filename,  // Utilise le nom du fichier comme nom de la vidéo
                uploadDate: Date.now()
            });
            await newVideo.save();

            res.status(200).json({ message: 'File uploaded successfully', video: newVideo });
        } catch (error) {
            res.status(500).json({ message: 'Error saving video details', error });
        }
    });
});

// Route GET pour récupérer toutes les vidéos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find().populate('user', 'username');  // Populate pour récupérer les détails de l'utilisateur si nécessaire
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
});

module.exports = router;*/

const express =require('express')

const router = express.Router();
const Video = require('../models/video');
const User = require('../models/user');
const multer = require('multer');

filename=''

const storage = multer.diskStorage({
    destination: './uploads',
    filename:(req,file,redirect)=>{
        let date= Date.now();
        let fl= date + '.' + file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})

//const upload = multer({storage: mystorage})
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },  // Limite la taille du fichier (ici 100MB)
  fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('video/')) {
          cb(null, true);
      } else {
          cb(new Error('Only video files are allowed!'));
      }
  }
})

router.post('/createVideo',upload.single('video'), async (req,res)=>{
    try{
        data = req.body;
        vid= new Video(data);
        vid.video = filename;
        savedVideo = await vid.save();
        filename='';
        res.status(200).send(savedVideo)

    } catch(error){
        res.status(400).send(error)
    }
})

router.delete('/deleteVideobyid/:id',async(req,res)=>{
  try{
      myid= req.params.id
      deletedVideo =await Video.findOneAndDelete({_id: myid})
      res.status(200).send(deletedVideo)
  }catch(error){
      res.status(400).send(error)
  }
})

router.get('/getAllVideos',async(req,res)=>{
  try{
      vid= await Video.find();
      res.status(200).send(vid)
  }catch(error){
      res.status(400).send(error)
  }
})


router.get('/getVideobyid/:id',async(req,res)=>{
  try{
      myid= req.params.id
      vid= await Video.findOne({_id: myid})
      res.status(200).send(vid)
  }catch(error){
      res.status(400).send(error)
  }
})

router.put('/updateVideo/:id',async(req,res)=>{
  try{
      myid = req.params.id;
      newData = req.body;
      updatedVideo = await Video.findOneAndUpdate({_id: myid},newData)
      res.status(200).send(updatedVideo)           
  }catch(error){
      res.status(400).send(error)
  }

})
 
module.exports = router;