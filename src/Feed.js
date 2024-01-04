import './Feed.css'
import CreateIcon from '@mui/icons-material/Create'
import InputOption from './InputOption'
import ImageIcon from '@mui/icons-material/Image'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post'
import { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

import {db} from "./firebase"
import {collection, orderBy, onSnapshot, query, addDoc, serverTimestamp, deleteDoc, doc} from 'firebase/firestore'
import {db as dbc} from "./firebase"
import {onSnapshot as snap, doc as docomo} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
const Feed=()=>{
     
    const [posts,setPosts]=useState([])
    const [input, setInput]= useState('')
    const user= useSelector(selectUser)

    useEffect(()=>{
      
       const q= query(collection(db, 'posts'),orderBy('timestamp','desc'));
       onSnapshot(q,(querysnapshot)=>{
        setPosts(
            querysnapshot.docs.map((doc)=>({
               id:doc.id,
               data: doc.data()
              
            }))
            
        )
       })
       
    },[])
    
    const  sendpost= (e)=>{
     e.preventDefault()
       addDoc(collection(db, 'posts'),{
          uid:user?.uid,
          name: user?.displayName,
          description: user?.email,
          message:input,
          photoURL: user?.photoURL||'',
         timestamp: serverTimestamp()
     
     })
     setInput('')
     console.log('uid:'+user?.uid)
    }
    
    const deleto= (document_uid)=>{
    
      snap(doc(dbc, 'posts', document_uid), (doc)=>{
                
                if(doc.data().uid===user?.uid){
                    deleteDoc(docomo(db, 'posts', document_uid))
                }
              })
    }

    return(

        <div className="feed">
            <div className="feed_inputcontainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form>
                        <input 
                        type="text"
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        placeholder='Write you Wish'/>
                        <button onClick={sendpost} type="submit">Send</button>
                    </form>
                       
                </div>
                <div className='feed_inputoptions'>
                     <InputOption Icon={ImageIcon} title='Photo' color="#0000FF"/>
                     <InputOption Icon={SubscriptionsIcon} title='Video' color="#FFFF00"/>
                     <InputOption Icon={EventNoteIcon} title='Event' color="#00FF00"/>
                     <InputOption Icon={CalendarViewDayIcon} title='Calender' color="#FF0000"/>
                </div>
            </div>
                 <FlipMove>
                {posts.map(({id, data:{
                    name,
                    description,
                    message,
                    photoURL,
                    timestamp

                     }})=>(
                    <Post key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoURL={photoURL}
                    timestamp={timestamp}
                    onClick={()=>deleto(id)}/>
                ))}
             </FlipMove>
        </div>
    )
}

export default Feed