import './header.css'
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { useState ,useEffect} from 'react';
import { CgProfile } from "react-icons/cg";



const Header = ()=>{
    let navigate = useNavigate();

    const [profileList,setProfileList] = useState({})
    const [open,setOpen] = useState(false)
    const [theme, settheme] = useState('lighttheme');

    const handleLikeClick = () => {
      if(theme ==='darktheme'){
        settheme('lighttheme')
      }else{
        settheme('darktheme')
      }
    };
    const getProfile =async()=>{
        

        const token = Cookies.get('jwtToken');

        const url2= 'http://localhost:4005/profile'

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
                setProfileList(data.profile);
                console.log(data)
                
            }

        }catch(e){
            console.log(e,'error')
            
        }

    
    }
    useEffect(()=>{
        document.body.className = theme;
        getProfile();
    },[theme])
    const onClickDel = ()=>{
        Cookies.remove('jwtToken');
        navigate('/auth')
    }
    return(
        <div className='container-fluid customnav'>
            <div className="row  cont6 ">
                <div>
                    <h3 className='watchcolor' style={{ fontWeight:'bolder'}}><span style={{backgroundColor:'rgb(121, 33, 110)', color:'white'}}>PFX</span>WATCH</h3>
                </div>
                
                <div className='btn3 mr-3'>
                    
                    <button className='btn mode1 mr-5 mb-2' onClick={handleLikeClick}>{theme==='lighttheme'?<FaRegMoon/>:<FiSun style={{color:'white'}}/>}</button>
                    <div className='text-center'>
                        <div className='pro1'><button className='btn mr-5 profileicon1' onClick={()=>setOpen(!open)}><CgProfile className='profileicon'/></button></div>
                        {open &&(<div className='pro2'><p >{profileList.name}</p>
                       </div>)}
                    </div>
                    <button className="btn  log_btn " onClick={onClickDel}>Logout</button>
                </div>

            </div>
           
            

        </div>
    );
}

export default Header;