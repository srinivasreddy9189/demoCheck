const mongoose = require('mongoose')



const homes = new mongoose.Schema({
    title:String,
    albumUrl:String,
    views:String,
    date:String,
    description:String,
    channelLogo:String,
    channelName:String,
})

const Homes = mongoose.model('Homes',homes);

const homesDetails = new mongoose.Schema({
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

const HomesDetails = mongoose.model('HomesDetails',homesDetails)


module.exports = {Homes,HomesDetails}