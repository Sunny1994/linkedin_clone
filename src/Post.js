import { Avatar } from '@mui/material'
import InputOption from './InputOption'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import './post.css'
import { useState, forwardRef, useEffect } from 'react';
import { doc } from 'firebase/firestore'
import { db as dbc } from "./firebase"
import { onSnapshot as snap } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

const Post = forwardRef(({ id, name, description, message, photoURL, onClick }, ref) => {

   const [st, setSt] = useState(false);
   const [del, setDel] = useState(false);

   const toggle = () => {
      setSt(!st)
   }

   const user = useSelector(selectUser);

   useEffect(() => {
      deletebutton(id)
   }, [id])

   const deletebutton = (document_uid) => {

      snap(doc(dbc, 'posts', document_uid), (doc) => {
         if (doc.data().uid === user.uid) {
            setDel(true);
         } else {
            setDel(false);
         }

      })
   }
   return (
      <div ref={ref} className="post">
         <div className='post_header'>
            <Avatar src={photoURL}>
               {name[0]}
            </Avatar>


            <div className='post_info'>

               <h2>{name}</h2>
               <p>{description}</p>
            </div>
         </div>
         <div className='post_body'>
            <p>{message}</p>

         </div>
         <div className='post_buttons'>
            <div onClick={toggle}>
               {st === true ? (<InputOption Icon={ThumbUpAltIcon} title='Like' color='blue' />) : (<InputOption Icon={ThumbUpAltIcon} title='Like' color='grey' />)}
            </div>
            <InputOption Icon={CommentIcon} title='Comment' color='grey' />
            <InputOption Icon={ShareIcon} title='Share' color='grey' />
            {
               del && <div onClick={onClick}>

                  <InputOption Icon={DeleteIcon} title='Delete' color='grey' />
               </div>
            }

         </div>

      </div>
   )
})

export default Post