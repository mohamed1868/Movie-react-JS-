import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function People() {

  let [People , setPeople] = useState([])


  async function getfilms( page){

    let api = await axios.get(`https://api.themoviedb.org/3/discover/person?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-Us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
     setPeople(api.data.results)

  }
  useEffect(()=>{

    getfilms(1)


  },[])
  return (
    <>
    {People ?
    
         <div className='row py-5'>

    {People.map((People , i)=> <div key={i} className='col-2'>
 
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + People.profile_path  } alt=''/>
      <h3 className='h5'>{People.name}</h3>

    </div>)}
    </div>
    :
    <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fas fa-spinner fa-span fa-3x'></li>
        </div>
    }



    
    </>
  )
}
