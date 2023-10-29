import React, { useState } from "react";
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import{auth,storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../firebase";
import { useNavigate,Link } from "react-router-dom";


function Register(){
 const navigate=useNavigate();
 const [Err,setErr]=useState(false)
 const handleSubmit = async (e)=>{
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        

  try{
    const res= await createUserWithEmailAndPassword(auth, email, password)
    
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on(
      (error) => {
       setErr(true);
       console.log(error)
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => { 
          await updateProfile(res.user,{
            displayName,
            photoURL:downloadURL,

          });

          await setDoc(doc(db,"users",res.user.uid),{
            uid:res.user.uid,
            displayName,
            email,
            photoURL:downloadURL,
          });

          await setDoc(doc(db,"userChat",res.user.uid),{})
          navigate("/");
        });
      }
    );
   
  }
  catch(err){
    setErr(true);
  }

    }
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lets Chat</span>
                <span className ="tittle">Register</span>
                <form onSubmit={handleSubmit}>
                <input type ="text" placeholder="display name"/>
                <input type ="email" placeholder="email"/>
                <input type ="password" placeholder="password"/>
                <input style={{display:"none"}}type= "file" id="File"/>
                <label htmlFor="File" ><div id="upload">Add an Avatar</div></label>
                <button>Sign Up</button>
                {Err && <span>something whent wrong</span> }
                </form>
                <p>Have an Accound?<Link to="/login">Login</Link></p>

            </div>
        </div>
    )
}
export default Register;