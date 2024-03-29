import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { login, logout, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import Login from './Login';
import { auth } from './firebase';
import Widgets from './Widgets';




function App() {

  const user=useSelector(selectUser)
  const dispatch= useDispatch()

  useEffect(()=>{
   auth.onAuthStateChanged(useroauth=>{
    if(useroauth){
      dispatch(login({
        email: useroauth.email,
        uid: useroauth.uid,
        displayName: useroauth.displayName,
        photoURL: useroauth?.photoURL
      }))
    }
    else{
     dispatch(logout)
    }
   })
  },[dispatch])
  
  return(
     
    <div className='app'>
      <Header/>

      
    {!user?
    (<Login/>):(<div className='app_body'>
    <Sidebar/>
    <Feed/>
    <Widgets/>
  </div>)}
      
    </div>

  )

}
export default App;
