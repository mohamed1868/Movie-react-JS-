import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Tvshow from './Tvshow'

export default function Tvd() {

    let [tv , settv] = useState(null)
    let [err , seterr] = useState('')
    let data = useParams()
    
   async function tvget(id){
    try{
              let api = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-Ue`)
       settv(api.data)
    }
    catch{
     seterr('Not found')

    }

    }

    useEffect(()=>{
        tvget(data.id)
    },[])
  return (<>
  

    {tv ? <div className='container'>
        <div className='row m-5'>
            <div className='col-3'>
                 <img className='w-100 photofilm'  src={`https://image.tmdb.org/t/p/w500` +tv.backdrop_path }/>     
            </div>
            <div className='col-9'>
             <h3>{tv.name}</h3>
             <p className=' py-3 filmp'>{tv.overview}</p>
             <ul>
               
                <li>vote : {tv.vote_average}</li>
                <li>popularity : {tv.popularity}</li>
                <li>vote_count : {tv.vote_count}</li>
             </ul>

            </div>
        </div>
  

        
        </div> :err ?<div className='alert alert-danger'>{err}</div> : <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fas fa-spinner fa-span fa-3x'></li>
        </div> }

        </>
  
  )
}
