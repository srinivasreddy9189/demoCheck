import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './auth.css'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie'



const Auth = ()=>{
    let navigate = useNavigate();
    const [loginBtn,setLoginBtn]= useState('login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [gender,setGender] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [error,setError] = useState('');
    const [submitError,setSubmitError]= useState(false);
    const [show,setShow]= useState(false)

const renderUserName = ()=>{
    return(
        <>
        <label htmlFor='name'>Username

        </label>
        <input type='text' id='name' className='form-control input11' value={name} placeholder='Enter your name' onChange={((e)=>setName(e.target.value))}/>
        
        </>
    );
}
const renderEmail = ()=>{
    return(
        <>
        <label htmlFor='email'>Email

        </label>
        <input type='text' id='email' className='form-control input11' value={email} placeholder='Enter your email' onChange={((e)=>setEmail(e.target.value))}/>
        
        </>
    );
}
const renderPhone = ()=>{
    return(
        <>
        <label htmlFor='phone'>Phone Number

        </label>
        <input type='text' id='phone' className='form-control input11' value={phoneNumber} placeholder='Enter your number' onChange={((e)=>setPhoneNumber(e.target.value))}/>
        
        </>
    );
}
const renderGender = ()=>{
    return(
        <>
        <label htmlFor='gender'>Gender

        </label>
        <input type='text' id='gender' className='form-control input11' value={gender} placeholder='Enter your gender' onChange={((e)=>setGender(e.target.value))}/>
        
        </>
    );
}
const renderPassword = ()=>{
    return(
        <>
        <label htmlFor='password'>Phone Number

        </label>
        <div className='form-control input11'>
        <input type={show?'text':'password'} id='password' className='input2'  value={password} placeholder='Enter your password' onChange={((e)=>setPassword(e.target.value))}/>
        <button className='button3' onClick={(()=>setShow(!show))}>{show?<FaRegEye style={{color:'rgb(121, 33, 110)'}}/>:<FaRegEyeSlash style={{color:'rgb(121, 33, 110)'}}/>}</button>
        </div>
        </>
    );
}
const onSubmitForm = async(e)=>{
e.preventDefault();

if(loginBtn === 'login'){
    const url1 = "http://localhost:4005/login"

    const options = {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
           
            email,
            password
        })
    }

    const response = await fetch(url1,options)
 
    const data = await response.json();

    if(response.ok === true){
        Cookies.set('jwtToken',data.token);
        navigate('/homes');

    }



}else{
if(password.length>=5 && password.length<=15){
    const url = "http://localhost:4005/signup"

    const options = {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            phoneNumber,
            gender,
            password
        })
    }

    const response = await fetch(url,options)
 
    const data = await response.json();
     
    if(response.ok === true){
        setLoginBtn('login')
    }else{
        setSubmitError(true);
        setError(data.message)
    }

}else{
setSubmitError(true)
    setError('Password length should be 5 to 8')
}
}


}

   useEffect(()=>{
    let token = Cookies.get('jwtToken')

    if(token !== undefined){
     navigate('/homes')
    }
   })


    return(
        <div className='cont1'>
            <div className='card_cont'>

            <div className='card1 '>
                <div className='img_cont1 mt-3'><h3 style={{color:'black', fontWeight:'bolder'}}><span style={{backgroundColor:'rgb(121, 33, 110)', color:'white'}}>PFX</span>WATCH</h3></div>

            </div>
            <div className='text-center mt-3'>
                <button className={loginBtn==='login'?'btn login_button mr-3':'btn button_off'} onClick={(()=>setLoginBtn('login'))}>Login</button>
                <button className={loginBtn==='signup'?'btn login_button ml-3':'btn button_off'} onClick={(()=>setLoginBtn('signup'))}>Signup</button>
            </div>
            <form className='mt-2 form_cont m-2' onSubmit={onSubmitForm}>
                <div className='input_cont text-center'>{loginBtn==='signup'?renderUserName():""}</div>
                <div className='input_cont text-center'>{renderEmail()}</div>
                <div className='input_cont text-center'>{loginBtn==='signup'?renderPhone():""}</div>
                <div className='input_cont text-center'>{loginBtn==='signup'?renderGender():""}</div>
                <div className='input_cont text-center'>{renderPassword()}</div>

                <button className='form-control mb-4 mt-3 button4' type='submit'>{loginBtn === 'login'?'Signin':'Signup'}</button>
                 {submitError && <p className='p1 text-danger text-center'>{error}</p>}
            </form>

        
            </div>
        </div>

    );
}

export default Auth;