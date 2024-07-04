/*const mongoose = require('mongoose')

const Video = mongoose.model('Video',{
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type: String},
    uploadDate: { type: Date, default: Date.now },  // Date de l'upload

    })

module.exports = Video;*/
const mongoose = require('mongoose');

const Video = mongoose.model('Video',{
  id_user: { type: String},  // Référence à l'utilisateur qui a uploadé la vidéo
  name: { type: String},  // Nom de la vidéo
  //uploadDate: { type: Date, default: Date.now },  // Date de l'upload
  video:{ type:String}
});

module.exports = Video;
