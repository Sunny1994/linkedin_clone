import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import axios from 'axios';
import { useEffect, useState } from 'react';


const Widgets=()=>{

  const [dato, setDato]=useState({})
  
  
  useEffect(()=>{

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news',
      params: {safeSearch: 'Off', textFormat: 'Raw'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '7acab692fcmshc4ba22d6da12a6cp14d14cjsnf96fa0ab3777',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
    

      let updatedvalue={'item1': response.data.value[0].name,
    'item2': response.data.value[1].name, 'item3': response.data.value[2].name,
  'item4': response.data.value[3].name, 'item5': response.data.value[4].name}


     setDato(dato=>({
      ...dato,
      ...updatedvalue
     }))
      

    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status)
      }
    });


  },[])


    
    const newsArticle=(heading)=>{


       return(
        <div className='widgets_article'>
              <div className='widgets_articleleft'>
              <FiberManualRecordIcon/>
              </div>
              <div className='widgets_articleright'>
              
                    <h4>{heading}</h4>
                    
              </div>
        </div>
       )
    }

    return(
        <div className='widgets'>
         <div className='widgets_header'>
           <h2>Linked In News <InfoIcon/></h2>
         </div>
         <div>{newsArticle(dato.item1)}</div>
         <div>{newsArticle(dato.item2)}</div>
         <div>{newsArticle(dato.item3)}</div>
         <div>{newsArticle(dato.item4)}</div>
         <div>{newsArticle(dato.item5)}</div>
         
         
         
        
        </div>
    )


}

export default Widgets