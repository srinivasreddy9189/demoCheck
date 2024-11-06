const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mongoose = require('mongoose')

const loginData = require('./logindata')
const jwt = require('jsonwebtoken')
const jwtAuth = require('./middle');

const {Homes,HomesDetails} = require('./schemadata')
const {Trending,TrendingDetails} = require('./trending')
const {Gaming,GamingDetails} = require('./gamingdata')

let  savedVideos = [];


// router.get('/',(req,res)=>{
//     res.send('auth file')
// })


router.post('/signup',async(req,res)=>{

   try{
    const {name,email,phoneNumber,gender,password} = req.body

    const existUser = await loginData.findOne({email:email})

    console.log(req.body)

    if(!existUser){
        const maskedPass = await bcrypt.hash(password,10);

        const newUser = new loginData ({
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            gender:gender,
            password:maskedPass
        })

        newUser.save();
        return res.status(200).json({message:'Registered sucess'})
    }
    else{
        return res.status(400).json({message:'User exists'})
    }

   }catch(e){

    console.log(e,'signup')


   }

})

//login
router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;

        const userFound = await loginData.findOne({email:email})

        if(userFound){
           const matchPassword = await bcrypt.compare(password,userFound.password)

           if(matchPassword){

            let  payLoad = {
                id:userFound._id
            }

            let token = jwt.sign(payLoad,'KEY',{expiresIn:'24hr'})
            return res.status(200).json({token:token,message:'login success'})
           }else{
            return res.status(400).json({message:'password not matched'})
           }
        }else{
            return res.status(400).json({message:'user not found'})
        }

    }catch(e){
        return res.status(500).json({message:'error'})
    }
})

//sending data to db
const addHomes = async () => {
    try {
      const homeDetail = new HomesDetails({
        title:'suryakumar yadav',
    albumUrl:'https://www.livemint.com/lm-img/img/2023/04/16/1600x900/Suryakumar_Yadav__1681652392334_1681652392508_1681652392508.jpg',
    videoUrl:'https://youtu.be/Nif9UAnDpmM?feature=shared',
    views:'10M Views',
    date:'20 June 2020',
    description:'Ponting picks Suryakumar Yadav for key batting position in Indias T20I side | The ICC Review',
    like:'Like',
    disLike:'Dislike',
    save1:'save',
    channelLogo:'https://yt3.ggpht.com/3K6h6gpMPf4mK9qh6SXTl0W3PLxnOMzUnFHc2lbS9t-ucS-b4JGcR8nW7ja9XDYkHM-kAnijk2c=s88-c-k-c0x00ffffff-no-rj',
    channelName:'ICC',
    subscribers:'10M Subscribers',
    channelDescription:'This is the official YouTube channel of the International Cricket Council.'
        
      });
  
      const savedHomeDetail = await homeDetail.save();
      // Create and save a Job document that uses the same _id as the JobDetail
  
      const home = new Homes({
        _id:savedHomeDetail._id,
        title:savedHomeDetail.title,
    albumUrl:savedHomeDetail.albumUrl,
    views:savedHomeDetail.views,
    date:savedHomeDetail.date,
    description:savedHomeDetail.description,
    channelLogo:savedHomeDetail.channelLogo,
    channelName:savedHomeDetail.channelName,
      });
  
  
      await home.save();
      await mongoose.disconnect();
    } catch (e) {
      console.log(e);
    }
  };


//   addHomes()
router.get('/homes',jwtAuth,async(req,res)=>{
    try{
        const {search} = req.query;
        
        const query = {}
       
       
        if(search){
            query.title = {$regex:search,$options:'i'};
        }

        const filteredHomes = await Homes.find(query);

        if(filteredHomes===0){
            return res.json('no jobs found')
        }
        else{
            return res.json({homes:filteredHomes})
        }

    }catch(e){
        console.log(e,'homes api')

        return res.status(500).json({message:'internal server error'})

    }
})


router.get('/homedetails/:homeId',jwtAuth,async(req,res)=>{
    try{

        const {homeId} = req.params;
        const homeDetails = await HomesDetails.findOne({_id:homeId})
       if(!homeDetails){
        return res.status(400).json({message:'no jobs found'})
       }

      
res.status(200).json({homeDetails:homeDetails})
    }catch(e){
        console.log(e,'job details api');

        return res.status(500).json({message:'server error'})
    }
})

const addTrending = async () => {
    try {
      const trendingDetail = new TrendingDetails({
        title:'animal',
        albumUrl:'https://i.ytimg.com/vi/Xbizke4zftY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBTHltgiq9A9684mKMOTcLhiDR1Eg',
        videoUrl:'https://youtu.be/Xbizke4zftY?feature=shared',
        views:'30M Views',
        date:'16 December 2023',
        description:'ANIMAL: Evarevaro (Full Video) - Ranbir Kapoor,Tripti Dimri | Sandeep V | Vishal M | Bhushan K',
        like:'Like',
        disLike:'Dislike',
        save1:'save',
        channelLogo:'https://yt3.ggpht.com/ytc/AIf8zZRi-52tXPm7fFT5W-_62rWTBOaVHt1xsJ8Cxjzj0g=s88-c-k-c0x00ffffff-no-rj',
        channelName:'T-series Telugu',
        subscribers:'20M Subscribers',
        channelDescription:'Welcome to the official Youtube Channel of T-series telugu Entertainment.',
        
      });
  
      const savedGamingDetail = await trendingDetail.save();
      // Create and save a Job document that uses the same _id as the JobDetail
  
      const trending = new Trending({
        _id:savedGamingDetail._id,
        title:savedGamingDetail.title,
    albumUrl:savedGamingDetail.albumUrl,
    views:savedGamingDetail.views,
    date:savedGamingDetail.date,
    description:savedGamingDetail.description,
    channelLogo:savedGamingDetail.channelLogo,
    channelName:savedGamingDetail.channelName,
      });
  
  
      await trending.save();
      await mongoose.disconnect();
    } catch (e) {
      console.log(e);
    }
  };



// addTrending();



router.get('/trending',jwtAuth,async(req,res)=>{
    try{
        const {search} = req.query;
        
        const query = {}
       
       
        if(search){
            query.title = {$regex:search,$options:'i'};
        }

        const filteredTrending = await Trending.find(query);

        if(filteredTrending===0){
            return res.json('no Trends found')
        }
        else{
            return res.json({trending:filteredTrending})
        }

    }catch(e){
        console.log(e,'homes api')

        return res.status(500).json({message:'internal server error'})

    }
})


router.get('/trendingDetails/:trendingId',jwtAuth,async(req,res)=>{
    try{

        const {trendingId} = req.params;
        const trendingDetails = await TrendingDetails.findOne({_id:trendingId})
       if(!trendingDetails){
        return res.status(400).json({message:'no trends found'})
       }

      
res.status(200).json({trendingDetails:trendingDetails})
    }catch(e){
        console.log(e,'trending details api');

        return res.status(500).json({message:'server error'})
    }
})


//sending gaming data
const addGaming = async () => {
    try {
      const gamingDetail = new GamingDetails({
        title:'Dota 2',
    albumUrl:'https://yt3.googleusercontent.com/CnaC9AqLAkkukH9D0vjcmT7KLjpOISEDJGjfWvtj7p2H8rfSHDzNjHuWQWj6ZvjwaBf2L16-NQ=s540-w390-h540-c-k-c0x00ffffff-no-nd-rj',
    videoUrl:'https://www.youtube.com/live/uM9X6e8Fds8?feature=shared',
    views:'200K Views',
    date:'17 July 2023',
    description:'Dota 2 is a video game developed and published by Valve.',
        like:'Like',
        disLike:'Dislike',
        save1:'save',
        channelLogo:'https://yt3.ggpht.com/r7mISTzNbcLem_plduc_SKMh9KUiP8CWnuhS7H4-CCErF4juXxkrK-5_4LOIMeYl-lXAXMUG=s88-c-k-c0x00ffffff-no-rj',
        channelName:'Gaming Channel',
        subscribers:'5M Subscribers',
        channelDescription:'The official home of Gaming Channel on YouTube',
        
      });
  
      const savedGamingDetail = await gamingDetail.save();
      // Create and save a Job document that uses the same _id as the JobDetail
  
      const gaming = new Gaming({
        _id:savedGamingDetail._id,
        title:savedGamingDetail.title,
    albumUrl:savedGamingDetail.albumUrl,
    views:savedGamingDetail.views,
    date:savedGamingDetail.date,
    description:savedGamingDetail.description,
    channelLogo:savedGamingDetail.channelLogo,
    channelName:savedGamingDetail.channelName,
      });
  
  
      await gaming.save();
      await mongoose.disconnect();
    } catch (e) {
      console.log(e);
    }
  };

//   addGaming()

router.get('/gaming',jwtAuth,async(req,res)=>{
    try{
        const {search} = req.query;
        
        const query = {}
       
       
        if(search){
            query.title = {$regex:search,$options:'i'};
        }

        const filteredGaming = await Gaming.find(query);

        if(filteredGaming===0){
            return res.json('no games found')
        }
        else{
            return res.json({gaming:filteredGaming})
        }

    }catch(e){
        console.log(e,'games api')

        return res.status(500).json({message:'internal server error'})

    }
})

router.get('/gamingDetails/:gamingId',jwtAuth,async(req,res)=>{
    try{

        const {gamingId} = req.params;
        const gamingDetails = await GamingDetails.findOne({_id:gamingId})
       if(!gamingDetails){
        return res.status(400).json({message:'no games found'})
       }

      
res.status(200).json({gamingDetails:gamingDetails})
    }catch(e){
        console.log(e,'gaming details api');

        return res.status(500).json({message:'server error'})
    }
})





router.get('/profile',jwtAuth,async(req,res)=>{
    
    try{
        const userd = await loginData.findOne({_id:req.id})
        return res.json({profile:userd})

    }catch(e){
        return res.json({message:'error'})
    }
})

router.get('/savedVideos', jwtAuth,(req, res) => {
    res.json(savedVideos);
  });








router.post('/savevideo/:id',jwtAuth,async(req,res)=>{
    try{

        const {id} = req.params;
        const gamingDetails = await GamingDetails.findOne({_id:id})
       if(!gamingDetails){
        return res.status(400).json({message:'no games found'})
       }

      
savedVideos.push(gamingDetails)
console.log(gamingDetails)
    }catch(e){
        console.log(e,'gaming details api');

        return res.status(500).json({message:'server error'})
    }
})



router.post('/savehomevideo/:id',jwtAuth,async(req,res)=>{
    try{

        const {id} = req.params;
        const gamingDetails = await HomesDetails.findOne({_id:id})
       if(!gamingDetails){
        return res.status(400).json({message:'no games found'})
       }

      
savedVideos.push(gamingDetails)
console.log(gamingDetails)
    }catch(e){
        console.log(e,'gaming details api');

        return res.status(500).json({message:'server error'})
    }
})




router.post('/savetrendvideo/:id',jwtAuth,async(req,res)=>{
    try{

        const {id} = req.params;
        const gamingDetails = await TrendingDetails.findOne({_id:id})
       if(!gamingDetails){
        return res.status(400).json({message:'no games found'})
       }

      
savedVideos.push(gamingDetails)
console.log(gamingDetails)
    }catch(e){
        console.log(e,'gaming details api');

        return res.status(500).json({message:'server error'})
    }
})


router.delete('/deletetrendvideo/:id', jwtAuth, async (req, res) => {
    try {
        // Extracting the 'id' parameter from the request params
        const { id } = req.params;

        // Find the index of the video in the savedVideos array
        const indexToRemove = savedVideos.findIndex(video => video._id !== id);

        // If the video is not found in the array, return a 404 status with a message
        if (indexToRemove === -1) {
            return res.status(404).json({ message: 'Video not found in saved videos' });
        }

        // Remove the video from the savedVideos array
        savedVideos.splice(indexToRemove, 1);

        // Respond with a success status
        return res.status(200).json({ message: 'Video deleted successfully' });
    } catch (e) {
        // If an error occurs during the process, log the error and respond with a 500 status
        console.log(e, 'delete trend video api');
        return res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;