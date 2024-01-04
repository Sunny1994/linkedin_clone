import './Login.css'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'

import "firebase/compat/auth"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

import { readAndCompressImage } from "browser-image-resizer";
import { ToastContainer, toast } from 'react-toastify'
import {auth, imageConfig} from './firebase'

import { Spinner } from 'reactstrap'


const Login=()=>{
   const [name, setName]=useState('')
   const [email, setEmail]=useState('')
   const [password, setPassword]=useState('')
 
   const [isUploading, setIsUploading] = useState(false);
   const [downloadUrl, setDownloadUrl] = useState(null);
   const dispatch= useDispatch()


   const profilepicker=async(e)=>{
         try{
          const file=e.target.files[0]

          var metadata={
            contentType: file.type
          }

          let resizedImage= await readAndCompressImage(file, imageConfig)
          
          const storage= getStorage()

          const storageRef= ref(storage, 'images/')
          var uploadTask= uploadBytesResumable(storageRef, resizedImage, metadata)

          uploadTask.on(
            'state_changed',(snapshot)=>{
              setIsUploading(true)
              var progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100
              console.log('the progress is'+progress+'%done')
              switch(snapshot.type){
                case 'paused':
                  setIsUploading(false)
                  console.log('uploading is paused')
                  break;
                  case 'running':
                    console.log('Uploading is in progress')
                    break;
              }
              if(progress===100){
                setIsUploading(false)
              toast('Upload is success', {type:'success'})
              }
            }, (error)=>{
              switch(error.code){
                case 'storage/unauthorized':
                toast('something is wrong', {type:'error'})
                

                case 'storage/cancelled':
                toast('user doesnt have permission to access', {type:'error'})
              }
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadnewURL=>{
                setDownloadUrl(downloadnewURL)
                console.log('File available at', downloadnewURL)
              })
              .catch(err=>console.log(err.message))
            }
          )
         }
         catch(err){
          console.log(err.message)
          toast('something went wrong',{type:"error"})
         }
   }
   
  const logintoapp=(e)=>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .then(usero=>{
       dispatch(login({
        email: usero.user.email,
        uid: usero.user.uid,
        displayName: usero.user.downloadUrl
       }))
    }).catch(error=>alert(error))

  }

  const register=()=>{

    if(!name){
     return  alert('Enter a name')
    }
      auth.createUserWithEmailAndPassword(email,password)
      .then((userAuth)=>{
        userAuth.user.updateProfile({
              displayName: name,
              photoURL: downloadUrl
        })
      .then(()=>{
        dispatch(login({
          email: userAuth.user.email,
          uid:userAuth.user.uid,
          displayName: name,
          photoURL: downloadUrl
        }))
      })
    }).catch(error=>alert(error))

  }

    return(
        <div className="login">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/LinkedIn_Logo_%28with_%C2%AE%29.svg/512px-LinkedIn_Logo_%28with_%C2%AE%29.svg.png?20170711102813"/>

      <form>
          <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='Full name Required'/>
          <div className='text-center'>
          {isUploading ? (
                <Spinner type="grow" color="primary" />
              ) : (
              <div>
              <label htmlFor='profilepicker' className=''>
              <img src={downloadUrl} alt='' className='profile'/>
              </label>
            <input type='file' name='image' id='profilepicker' 
            accept='image/*'
            multiple={false}
            onChange={e=>profilepicker(e)} className='hidden'/>
            </div>
            )}
            
            

          </div>
          
          <input value={email} onChange={e=>setEmail(e.target.value)}type="Email" placeholder='Email'/>
          <input value={password} onChange={e=>setPassword(e.target.value)}type="password" placeholder='Password'/>
          <button type="submit" onClick={logintoapp}>Sign In</button>
        </form>

        <p>Not a Member? 
          <span className='login_register' onClick={register}>  Register Now</span>
        </p>
    


         <ToastContainer/>
        </div>
    )
        
} 

export default Login