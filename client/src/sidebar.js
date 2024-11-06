import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { IoGameControllerSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";



const Sidebar=()=>{
    
    return(
<>
<div className="container-fluid">
   
  <div className="justify-content-center">
<Link className="link2"  to='/homes'> <p className="link1"><b><FaHome className="mr-3"/>Home</b></p></Link>
<Link className="link2"  to='/trending'><p className="link1"><b><FaFire className="mr-3"/>Trending</b></p></Link>
<Link className="link2" to='/gaming' ><p className="link1"><b><IoGameControllerSharp className="mr-3"/>Gaming</b></p></Link>
<Link className="link2" to='/savedVideos' ><p className="link1"><b><FaSave className="mr-3"/>Saved Videos</b></p></Link>
</div>
</div>
</>
    )
}

export default Sidebar;