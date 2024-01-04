import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import './Sidebar.css'

function Sidebar(){
    const user= useSelector(selectUser)

    const recentItem=(topic)=>{
        return(
        <div className="sidebar_recentItem">
           <span className="sidebar_Ash">#</span>
           <p>{topic}</p>
        </div>
        )
    }

    return(
        <div className="sidebar">
           <div className="sidebar_top">
            <img src="https://images.unsplash.com/photo-1599239663833-4c1cdc22892a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" alt=""/>
              <Avatar src={user?.photoURL}className='sidebar_avatar'/>
                
              <h2>{user.displayName}</h2>
              <h4>{user.email}</h4>
           </div>
           <div className="sidebar_stats">
               <div className="sidebar_stat">
                <p>who viewed you</p>
                <p className="sidebar_statnumber">2584</p>
               </div>
               <div className="sidebar_stat">
               <p>Views on post</p>
                <p className="sidebar_statnumber">2547</p>
               </div>
           </div>
           <div className="sidebar_bottom">
            <p>Recent</p>
            {recentItem('React')}
            {recentItem('Go')}
            {recentItem('Baby')}
            {recentItem('Pro')}
           </div>
        </div>
    )
}

export default Sidebar