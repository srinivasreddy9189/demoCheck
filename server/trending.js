const mongoose = require('mongoose')



const trending = new mongoose.Schema({
    title:String,
    albumUrl:String,
    views:String,
    date:String,
    description:String,
    channelLogo:String,
    channelName:String,
})

const Trending = mongoose.model('Trending',trending);

const trendingDetails = new mongoose.Schema({
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

const TrendingDetails = mongoose.model('TrendingDetails',trendingDetails)


module.exports = {Trending,TrendingDetails}