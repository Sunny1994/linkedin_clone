import { Avatar } from '@mui/material'
import InputOption from './InputOption'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import './post.css'
import { useState,forwardRef } from 'react';

const Post=forwardRef(({name, description, message, photoURL, onClick}, ref)=>{
     
     const [st, setSt]=useState(false)
      

     const toggle=()=>{
      setSt(!st)
     }
    return(
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
                  {st===true?(<InputOption Icon={ThumbUpAltIcon} title='Like' color='blue'/>):(<InputOption Icon={ThumbUpAltIcon} title='Like' color='grey'/>)}
                  </div>
                     <InputOption Icon={CommentIcon} title='Comment' color='grey'/>
                     <InputOption Icon={ShareIcon} title='Share' color='grey'/>

                     <div onClick={onClick}>
                      
                        <InputOption Icon={DeleteIcon} title='Delete'color='grey'/>
                    </div>
               </div>
             
        </div>
    )
})

export default Post