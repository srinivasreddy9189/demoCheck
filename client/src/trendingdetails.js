import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Header from "./header";
import Sidebar from "./sidebar";
import ReactPlayer from 'react-player'
import './homedetails.css'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TrendSaveButton } from "./savevideobutton";

const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}

const TrendingDetails =()=>{
    const[apiStatus,setApiStatus]= useState(apiStatusConstant.intial);

    const [trendingDetails,setTrendingDetails] = useState([]);
    
    let navigate = useNavigate();

    let params = useParams();

    const {trendingId} = params;
    useEffect(()=>{
        let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
        
        getTrendingDetails();
    },[])

    const getTrendingDetails = async()=>{
        setApiStatus(apiStatusConstant.progress);
const token = Cookies.get('jwtToken')
        const url3 = `http://localhost:4005/trendingDetails/${trendingId}`

        const options = {
            headers:{
                Authorization: `Bearer ${token}`
            },
            method:'GET'
        }
        const response = await fetch(url3,options);
       
        if(response.ok === true){
            
            const data = await response.json();
            setTrendingDetails(data.trendingDetails);

           
            // console.log(data)
            setApiStatus(apiStatusConstant.success)
        }else{
            setApiStatus(apiStatusConstant.failure)
        }

    }
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
      setLiked(!liked);
    };
    const [disliked, setDisLiked] = useState(false);

    const handleDisLikeClick = () => {
      setDisLiked(!disliked);
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
                <div className="container-fluid mt-2">
            <ReactPlayer controls ={true} width='100%' height='500px' url={trendingDetails.videoUrl} />
            <div className="mt-2 ml-4">
                <b>{trendingDetails.description}</b>
            </div>
          <div className="d-flex justify-content-between ml-4">
            <div>
                <p>{trendingDetails.views}</p>
            </div>
            <div>
                <p>{trendingDetails.date}</p>
            </div>
            <div className="buttons">
            <button className={liked ===true?'btn blue':'btn grey'} onClick={handleLikeClick}><AiOutlineLike className="mb-1"/>
      {liked ? 'Unlike' : 'Like'}
    </button>
    <button className={disliked ===true?'btn blue':'btn grey'} onClick={handleDisLikeClick}><AiOutlineDislike className=""/>
      {disliked ? 'Unlike' : 'dislike'}  </button>
      <TrendSaveButton trendingDetails={trendingDetails}/>
            </div>

          </div>
            <hr style={{border:'1px solid black'}}></hr>
            <div className='main d-flex mt-3 ml-4'>
                                <div className='sub1 mr-3'>
                                    <img src={trendingDetails.channelLogo} className='img2'/>
                                </div>
                                <div className='sub2'>
                                   <p> <b>{trendingDetails.channelName}</b></p>
                                   <p> <b>{trendingDetails.subscribers}</b></p>
                                   <p> <b>{trendingDetails.channelDescription}</b></p>
                                </div>
                            </div>
            </div>
                </div>

            </div>

        </div>
        
        </>
    )
}

export default TrendingDetails;