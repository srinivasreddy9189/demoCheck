import  {useState,useEffect} from 'react'
import Cookies from 'js-cookie';
import Header from './header';
import './home.css'
import { CiSearch } from "react-icons/ci";
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import Sidebar from './sidebar';


import { BrowserRouter,Routes,Route } from 'react-router-dom';
const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}
const Home =()=>{
    const [homes,setHomes]= useState([]);
    console.log(homes)
    const [searchInput,setSearchInput]= useState('');

    const [apiStatus,setApiStatus] = useState(apiStatusConstant.intial);
let navigate = useNavigate();
    useEffect(()=>{
        let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
getHomes();
    },{})

    const onChangeSearch = (e)=>{
        setSearchInput(e.target.value)

    }
    const getHomes = async()=>{
        setApiStatus(apiStatusConstant.progress)

        const token = Cookies.get('jwtToken');

        const url2= `http://localhost:4005/homes?search=${searchInput}`

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
                setHomes(data.homes);
                setApiStatus(apiStatusConstant.success)
            }

        }catch{
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const renderHomes = ()=>{
        return(
            <div className='container-fluid'>
                <div className=' cont77 mt-1'>
                <div className='box text-light'>
                    <h3  style={{ fontWeight:'bolder', color:'white'}}><span style={{backgroundColor:'rgb(121, 33, 110)', color:'white'}}>PFX</span>WATCH</h3>

                    <p>Buy PFX WATCH premium</p>
                    <button className='getbtn'>GET IT NOW</button>
                   
                </div>
                </div>
                 <div className="input1 form-control w-50 d-flex justify-content-between mb-5">
                   
                   <input className="inp1 w-100" 
                   type="search" placeholder="search" 
                   onChange={onChangeSearch} 
                   onKeyDown={onkeydown} 
                   value={searchInput}/>
                   

                 <div className="d-flex justify-content-center align-items-center mb-1 searchbox">
                 <button className="but1" onClick={getHomes}><CiSearch/></button>
                 </div>


               </div>
                <div className='row'>
                    {homes.map((each)=>(
                        <div className='col-md-6 mt-3'  key={each._id}>
                            <div>
                              <Link to={`/homes/${each._id}`}> <img className='img1' src={each.albumUrl}/></Link> 
                            </div>
                            <div className='descrip'>
                                <b >{each.description}</b>
                            </div>
                            <div className='main d-flex mt-3'>
                                <div className='sub1 mr-3'>
                                    <img src={each.channelLogo} className='img2'/>
                                </div>
                                <div className='sub2'>
                                   <p> <b>{each.channelName}</b></p>
                                   <p> <b>{each.views}</b></p>
                                   <p> <b style={{opacity:'0.7'}}>{each.date}</b></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
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
    const renderHomesSection = ()=>{
        switch(apiStatus){
         case apiStatusConstant.success:
         return renderHomes();
         
             case apiStatusConstant.progress:
                 return renderLoader();
                 default:
                     return null;
        }
     }
     
    return(
        <>
        
        <Header />
        
        <div className="container-fluid">
        
            <div className="row">
                <div className="col-md-3 sidebarnav">
                   <Sidebar/>

                </div>
                <div className="col-md-9 col1">
                
                 
                {renderHomesSection()}
               

                    
                </div>
            </div>

        </div>
        
        
        </>
    )
}

export default Home;