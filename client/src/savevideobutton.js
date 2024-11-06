
import { useState } from "react";
import Cookies from "js-cookie";


const SaveVideoButton = ({savedDetails})=>{
    const {_id,title,channelName}=savedDetails;
    const [savinetails,setSavingDetails] = useState([]);

    const [saved,setSaved] =  useState(false)

    const onClicked = ()=>{
        setSaved(!saved)
    }

    const getSavingDetails = async()=>{
        

        
        const token = Cookies.get('jwtToken')
                const url3 = `http://localhost:4005/savevideo/${savedDetails._id}`
        
                const options = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    method:'POST',
                    body: JSON.stringify(),
                    
                }
                
                const response = await fetch(url3,options);
               
                if(response.ok === true){
                    
                    const data = await response.json();
                    setSavingDetails(data);
        
                   
                    console.log(data)
                    
                }else{
                    
                }
        
            }

            const multipleClicks = ()=>{
                onClicked()
                getSavingDetails()
            }
    return(
        <>
        <button onClick={multipleClicks} className="btn btn-success">{saved?'Saved':'save'}</button>
        
        </>
    )
}


const HomeSaveButton = ({homeDetails})=>{

    const {_id,title,channelName}=homeDetails;
    const [savinetails,setSavingDetails] = useState([]);
    const [saved,setSaved] =  useState(false)

    const onClicked = ()=>{
        setSaved(!saved)
    }

    
    
    const getSavingDetails = async()=>{
        
          
        
        const token = Cookies.get('jwtToken')
                const url3 = `http://localhost:4005/savehomevideo/${homeDetails._id}`
        
                const options = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    method:'POST',
                    body: JSON.stringify(),
                    
                }
                
                const response = await fetch(url3,options);
               
                if(response.ok === true){
                    
                    const data = await response.json();
                    setSavingDetails(data);
        
                   
                    console.log(data)
                    
                }else{
                    
                }
        
            }
            const multipleClicks = ()=>{
                onClicked()
                getSavingDetails()
            }
    return(
        <>
        
        <button className = 'btn btn-success' onClick={multipleClicks}>{saved?'Saved':'save'}</button>
       
        </>
    )
}

const TrendSaveButton = ({trendingDetails})=>{

    const {_id,title,channelName}=trendingDetails;
    const [savinetails,setSavingDetails] = useState([]);
    const [saved,setSaved] =  useState(false)

    const onClicked = ()=>{
        setSaved(!saved)
    }
    const getSavingDetails = async()=>{
        

        
        const token = Cookies.get('jwtToken')
                const url3 = `http://localhost:4005/savetrendvideo/${trendingDetails._id}`
        
                const options = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    method:'POST',
                    body: JSON.stringify(),
                    
                }
                
                const response = await fetch(url3,options);
               
                if(response.ok === true){
                    
                    const data = await response.json();
                    setSavingDetails(data);
        
                   
                    console.log(data)
                    
                }else{
                    
                }
        
            }
            const multipleClicks = ()=>{
                onClicked()
                getSavingDetails()
            }
    return(
        <>
        
        <button className="btn btn-success" onClick={multipleClicks}>{saved?'Saved':'save'}</button>
        </>
    )
}


export {HomeSaveButton,SaveVideoButton,TrendSaveButton};