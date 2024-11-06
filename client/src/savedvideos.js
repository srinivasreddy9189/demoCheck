// src/SavedVideosPage.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const SavedVideosPage = () => {

   const [savedVideos,setSavedVideos] = useState([])

   let navigate = useNavigate();
   
   useEffect(()=>{
    let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
    getSavedVideos()
   },[])
   const getSavedVideos = async()=>{
    // setApiStatus(apiStatusConstant.progress)

    const token = Cookies.get('jwtToken');

    const url2= 'http://localhost:4005/savedvideos'

    const options = {

        headers:{
            Authorization: `Bearer ${token}`
        },

       method:'GET'
        
    };
    try{
        const response = await fetch(url2,options)
        

        if(response.ok === true){
            const data = await response.json();
            setSavedVideos(data);
            console.log(data)
            // setApiStatus(apiStatusConstant.success)
        }


    }catch{
        // setApiStatus(apiStatusConstant.failure)
    }
}

// const delUser = _id=>{
//     const filteredUser = savedVideos.filter((each)=>each._id !==_id)

//     setSavedVideos(filteredUser)
// }

const delUser = async (_id) => {
    try {
      const response = await fetch(`http://localhost:4005/deletetrendvideo/${savedVideos._id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Video unsaved successfully!');
        // Update the state to reflect the changes
        setSavedVideos((prevSavedVideos) =>
          prevSavedVideos.filter((video) => video._id !== _id)
        );
      } else {
        console.log('Error unsaving video!');
      }
    } catch (error) {
      console.error('Error unsaving video:', error);
    }
  };

 return(
    <>
    <Header/>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-3 sidebarnav">
                <Sidebar/>

            </div>
            <div className="col-md-9 col1">
          
{savedVideos.map((each)=>(
    <>
     <div className="row mt-3">
     <div className="col-md-4">
        <img className="img1" src={each.albumUrl}/>
     </div>
     <div className="col-md-8">
         <p><b>{each.title}</b></p>
         <p><b style={{color:'blue',fontSize:'small'}}>{each.channelName}</b></p>
         <p><b style={{ fontSize:'small'}}>{each.views}</b></p>
         <p><b style={{color:'blue', fontSize:'small'}}>{each.date}</b></p>
         <button className='btn btn-danger' onClick={()=>delUser(each._id)}>unsave</button>
     </div>
     </div>
     
     <hr style={{border:'1px solid black'}}/>
     </>
))}
            </div>
            </div>
            </div>
            </>
 )
};

export default SavedVideosPage;
