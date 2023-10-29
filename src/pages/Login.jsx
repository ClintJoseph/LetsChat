import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login(){

    const navigate=useNavigate();
    const [Err,setErr]=useState(false)
    const handleSubmit = async (e)=>{
           e.preventDefault()
          
           const email = e.target[0].value;
           const password = e.target[1].value;
          
           
   
     try{
       await signInWithEmailAndPassword(auth, email, password)
       navigate("/")
     }
     catch(err){
       setErr(true);
     }
   
       }
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lets Chat</span>
                <span className ="tittle">Login</span>
                <form  onSubmit={handleSubmit}>
                
                <input type ="email" placeholder="email"/>
                <input type ="password" placeholder="password"/>
                <button>Sign In</button>
                {Err && <span>something whent wrong</span> }
                </form>
                
                <p>Does'nt have an Accound?<Link to="/register">Register</Link></p>

            </div>
        </div>
    );
}
export default Login;