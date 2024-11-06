import Header from "./header";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}

const Trending =()=>{
    const [trending,setTrends]= useState([]);
    console.log(trending)
    const [searchInput,setSearchInput]= useState('');

    const [apiStatus,setApiStatus] = useState(apiStatusConstant.intial);
    let navigate = useNavigate()

    useEffect(()=>{
        let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
getTrends();
    },[])

    const getTrends = async()=>{
        setApiStatus(apiStatusConstant.progress)

        const token = Cookies.get('jwtToken');

        const url2= `http://localhost:4005/trending?search=${searchInput}`

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
                setTrends(data.trending);
                // console.log(data)
                setApiStatus(apiStatusConstant.success)
            }


        }catch{
            setApiStatus(apiStatusConstant.failure)
        }
    }
    const renderLoader = ()=>{
        
        return(
            <div className="container cont11">
                <ThreeDots
  height="80"
  width="80"
  radius="9"
  color="rgb(121, 33, 110)"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
            </div>
        );
    }
const renderTrends = ()=>{
    return(
        <>
        <div className="container-fluid">
            
            
                {trending.map((each)=>(
                    <>
                    <div className="row mt-3">
                    <div className="col-md-4">
                       <Link to={`/trending/${each._id}`}><img className="img1" src={each.albumUrl}/></Link> 
                    </div>
                    <div className="col-md-8">
                        <p><b>{each.description}</b></p>
                        <p><b style={{color:'blue',fontSize:'small'}}>{each.channelName}</b></p>
                        <p><b style={{ fontSize:'small'}}>{each.views}</b></p>
                        <p><b style={{color:'blue', fontSize:'small'}}>{each.date}</b></p>
                    </div>
                    </div>
                    <hr style={{border:'1px solid black'}}/>
                    </>
                ))}

            </div>
        
        </>
    );
}
const renderTrendsSection = ()=>{
    switch(apiStatus){
     case apiStatusConstant.success:
     return renderTrends();
     
         case apiStatusConstant.progress:
             return renderLoader();
             default:
                 return null;
    }
 }
 
    return(
        <>
        <Header/>
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-md-3 sidebarnav">
                <Sidebar/>
                </div>
                <div className="col-md-9 col1"> 
                <h3><b><FaFire className="mb-1"/>Trending</b></h3>
                {renderTrendsSection()}</div>
               
            
            </div>

        </div>
        </>
    )
}

export default Trending;