import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movice() {
  let [Movice , setMovice] = useState([])
  let [search , setsearch] = useState('')

  function searchfilm(ele){
    let data = ele.target.value.toUpperCase()
    setsearch(data)
  }
  
  let nums = new Array(13).fill(1).map((ele , i)=> i +1)

  async function getfilms( pagenaumper){
    

    let api = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-Us&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pagenaumper}`)
    setMovice(api.data.results)

  }
  useEffect(()=>{
    getfilms(1)



  },[])


  return (
    <>
    <div className='d-flex justify-content-center py-5'>
      <input type='search' onChange={searchfilm} placeholder='search' />
    </div>
    {Movice ?
    
           <div className='row'>

    {Movice.filter((show)=> show.title.toUpperCase().includes(search)).map((Movice , i)=> <div key={i} className='col-2'>
      <Link to={`/Movied/${Movice.id}`}>
      <img className='w-100 m-2' src={'https://image.tmdb.org/t/p/w500' + Movice.poster_path } alt=''/>
      <h3 className='h5'>{Movice.title}</h3>
      </Link>

    </div>)}
    </div>
    :    <div className='vh-100 d-flex align-items-center justify-content-center'>
            <li className='fa fa-spinner fa-spin  fa-3x'></li>
        </div> }

        <nav aria-label="..." className='py-5'>
  <ul className="pagination pagination-sm d-flex justify-content-center">

    {nums.map((el)=> <li onClick={()=>getfilms(el)} key={el} className="page-item lipage"><a className="page-link bg-transparent text-white" >{el}</a></li>)}

   

  </ul>
</nav>

    </>
  )
}
