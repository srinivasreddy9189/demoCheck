import Header from "./header";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoGameControllerSharp } from "react-icons/io5";

const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}

const Gaming =()=>{
    const [gaming,setGaming]= useState([]);
    // console.log(gaming)
    const [searchInput,setSearchInput]= useState('');

    const [apiStatus,setApiStatus] = useState(apiStatusConstant.intial);
    let navigate = useNavigate()

    useEffect(()=>{
        let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
getGames();
    },[])
    
    const getGames = async()=>{
        setApiStatus(apiStatusConstant.progress)

        const token = Cookies.get('jwtToken');

        const url2= `http://localhost:4005/gaming?search=${searchInput}`

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
                setGaming(data.gaming);
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

    //abba sai ram srinivas reddy
const renderGames = ()=>{
    return(
        <>
        <div className="container-fluid">
            
        <div className="row">
                {gaming.map((each)=>(
                    <>
                    
                    <div className="col-md-3 mt-3">
                       <Link to={`/gaming/${each._id}`}><img className="img-fluid imh1" src={each.albumUrl}/></Link> 
                    
                        <div className="info1">
                        <p className="para1"><b>{each.title}</b></p>
                        
                        <p><b style={{ fontSize:'small'}}>{each.views}</b></p>
                        
                        </div>
                        <hr style={{border:'1px solid black'}}/>
                        </div>
                    
                    
                    </>
                    
                ))}
</div>
            </div>
        
        </>
    );
}
const renderGamesSection = ()=>{
    switch(apiStatus){
     case apiStatusConstant.success:
     return renderGames();
     
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
                <h3><b><IoGameControllerSharp className="mb-1"/>Gaming</b></h3>
                {renderGamesSection()}</div>
               
            
            </div>

        </div>
        </>
    )
}

export default Gaming;