import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'


export default function Movied() {
   let [movies , setmovie] = useState(null)
   let [err , seterr] =useState('')
   let data = useParams() 

   async function setfilm(id){
try{
       let api = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-Ue`)
   setmovie(api.data)
} 
catch{
    seterr("not founed")
}
    

   }

   useEffect(()=>{
   setfilm(data.id)

   } ,[])

 
   
  return (<>
       


      {movies && err === '' ? <div className='container'>
        <div className='row m-5'>
            <div className='col-3'>
                 <img className='w-100 photofilm'  src={`https://image.tmdb.org/t/p/w500` +movies.backdrop_path }/>     
            </div>
            <div className='col-9'>
             <h3>{movies.title}</h3>
             <p className=' py-3 filmp'>{movies.overview}</p>
             <ul>
                <li>budget : {movies.budget}</li>
                <li>vote : {movies.vote_average}</li>
                <li>popularity : {movies.popularity}</li>
                <li>vote_count : {movies.vote_count}</li>
             </ul>


            </div>
        </div>
          
        </div> : err ? <div className='alert alert-danger'>{err}</div>: <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fa fa-spinner fa-spin fa-3x'></li>
        </div> }
  
  </>

    
  )
}
