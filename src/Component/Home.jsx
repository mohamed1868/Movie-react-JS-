import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  
  let [Movice , setMovice] = useState([])
  let [Tv , setTv] = useState([])
  let [People , setPeople] = useState([])

  async function getfilms( apidata , callback){

    let api = await axios.get(`https://api.themoviedb.org/3/trending/${apidata}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
     callback(api.data.results.slice(0,10))

  }
  useEffect(()=>{
    getfilms('movie' , setMovice)
    getfilms('tv' , setTv)
    getfilms('person' , setPeople)


  },[])


  return (
    <>
    
    <div className='row'>
      <div className='col-4 d-flex align-items-center'>
        <div className='w-50 '>
        <h2>Movie</h2>
        <hr  /> 
        </div>

      </div>
    {Movice.map((Movice , i)=> <div key={i} className='col-2'>
      <Link to={`/Movied/${Movice.id}`}>
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + Movice.poster_path } alt=''/>
      <h3 className='h5'>{Movice.title}</h3>
      </Link>

    </div>)}
    </div>
    <div className='row py-5'>
            <div className='col-4 d-flex align-items-center'>
        <div className='w-50 '>
        <h2>Tv</h2>
        <hr  /> 
        </div>

      </div>
    {Tv.map((Tv , i)=> <div key={i} className='col-2'>
    <Link to={`/Tvd/${Tv.id}`}>
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + Tv.poster_path } alt=''/>
      <h3 className='h5'>{Tv.name}</h3>
      </Link>
    </div>)}
    </div>
    <div className='row py-4'>
            <div className='col-4 d-flex align-items-center'>
        <div className='w-50 '>
        <h2>Person</h2>
        <hr  /> 
        </div>

      </div>
    {People.map((People , i)=> <div key={i} className='col-2'>
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + People.profile_path } alt=''/>
      <h3 className='h5'>{People.name}</h3>
    </div>)}
    </div>

    
    
    </>
  )
}
