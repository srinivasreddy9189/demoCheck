const mongoose = require('mongoose')



const gaming = new mongoose.Schema({
    title:String,
    albumUrl:String,
    views:String,
    date:String,
    description:String,
    channelLogo:String,
    channelName:String,
})

const Gaming = mongoose.model('Gaming',gaming);

const gamingDetails = new mongoose.Schema({
    title:String,
    albumUrl:String,
    videoUrl:String,
    views:String,
    date:String,
    description:String,
    like:String,
    disLike:String,
    save1:String,
    channelLogo:String,
    channelName:String,
    subscribers:String,
    channelDescription:String
})

const GamingDetails = mongoose.model('GamingDetails',gamingDetails)


module.exports = {Gaming,GamingDetails}