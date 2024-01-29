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
      url: 'https://news-api14.p.rapidapi.com/search',
      params: {
        q: 'computer',
        country: 'us',
        language: 'en',
        pageSize: '10',
        publisher: 'cnn.com,bbc.com'
      },
      headers: {
        'X-RapidAPI-Key': '7acab692fcmshc4ba22d6da12a6cp14d14cjsnf96fa0ab3777',
        'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {

      let updatedvalue = {
        'item1': response.data.articles[0].title,
        'item2': response.data.articles[1].title, 'item3': response.data.articles[2].title,
        'item4': response.data.articles[3].title, 'item5': response.data.articles[4].title,
        'item5': response.data.articles[5].title, 'item6': response.data.articles[6].title,
        'item7': response.data.articles[7].title, 'item8': response.data.articles[8].title,
        'item9': response.data.articles[9].title
      }

      setDato({
        ...dato,
        ...updatedvalue
      })


    }).catch(function (error) {
      if (error.response) {
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
      <div>{newsArticle(dato.item6)}</div>
      <div>{newsArticle(dato.item7)}</div>
      <div>{newsArticle(dato.item8)}</div>
      <div>{newsArticle(dato.item9)}</div>
      

    </div>
  )


}

export default Widgets