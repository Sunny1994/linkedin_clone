import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import axios from 'axios';
import { useEffect, useState } from 'react';


const Widgets = () => {

  const [dato, setDato] = useState({})


  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://google-news13.p.rapidapi.com/latest',
      params: { lr: 'en-US' },
      headers: {
        'X-RapidAPI-Key': '7acab692fcmshc4ba22d6da12a6cp14d14cjsnf96fa0ab3777',
        'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {

      let updatedvalue = {
        'item1': response.data.items[0].title,
        'item2': response.data.items[1].title, 'item3': response.data.items[2].title,
        'item4': response.data.items[3].title, 'item5': response.data.items[4].title
      }

      setDato(dato => ({
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


  }, [])



  const newsArticle = (heading) => {


    return (
      <div className='widgets_article'>
        <div className='widgets_articleleft'>
          <FiberManualRecordIcon />
        </div>
        <div className='widgets_articleright'>

          <h4>{heading}</h4>

        </div>
      </div>
    )
  }

  return (
    <div className='widgets'>
      <div className='widgets_header'>
        <h2>Linked In News <InfoIcon /></h2>
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