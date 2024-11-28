import React from 'react'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


export default function Tvshow() {


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toUpperCase());
  };

  let [Tv , setTv] = useState([])
  let nums = new Array(13).fill(1).map((el , i)=> i +1)


  async function getfilms( padgenumber){

    let api = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-Us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${padgenumber}`)
     setTv(api.data.results)

  }
  useEffect(()=>{

    getfilms(1)



  },[])

  return (
    <>
    <div className='d-flex justify-content-center' >
      <input type='search'  onChange={handleSearch} placeholder='search' />
    </div>
    {Tv ?


    <div className='row py-5'>

    {Tv.filter(show => show.name.toUpperCase().includes(searchTerm))
          .map((Tv, i)=> <div key={i} className='col-2'>
    <Link to={`/Tvd/${Tv.id}`}>
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + Tv.poster_path } alt=''/>
      <h3 className='h5'>{Tv.name}</h3>
      </Link>
    </div>)}
    </div>
    :
    <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fas fa-spinner fa-span fa-3x'></li>
        </div>
    }

<nav aria-label="..." className='py-5'>
  <ul className="pagination pagination-sm d-flex justify-content-center">

    {nums.map((el)=> <li onClick={()=>getfilms(el)} key={el} className="page-item lipage"><a className="page-link bg-transparent text-white" >{el}</a></li>)}

   

  </ul>
</nav>


    
    </>
  )
}
