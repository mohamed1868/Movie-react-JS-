import React, { useEffect } from 'react'
import { Link , to} from 'react-router-dom'

export default function Navbar(props) {
       let ul = document.querySelectorAll('li a')
    function Addactive(){

       ul.forEach((ele) => {
        ele.onclick = function(){
          ul.forEach((el)=>el.classList.remove('active'))
          ele.classList.add('active')
        }
         
       });
    }

      Addactive()


    

   



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow p-3 mb-5 bg-white rounded">
  <div className="container-fluid">
    <Link className="navbar-brand" to={''}>Movies</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        {props.data ? <>
        <li className="nav-item  ">
          <Link className="nav-link active" aria-current="page" to={'Home'}>Home</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to={'Movice'}>Movice</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to={'Tvshow'}>Tv show</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to={'People'}>People</Link>
        </li>
        </>: ""}

      </ul>
      <ul className="navbar-nav  mb-2 mb-lg-0  ">
            <li className="nav-item d-flex align-items-center">
          <li className='fab mx-2 fa-facebook text-white-50' />
          <li className='fab mx-2 fa-twitter text-white-50' />
          <li className='fab mx-2 fa-instagram text-white-50' />
          <li className='fab mx-2 fa-spotify text-white-50' />
          <li className='fab mx-2 fa-soundcloud text-white-50' />
        </li>  
        {props.data ? <>
      <li className="nav-item">
          <span className='nav-link Logout0' aria-current="page" onClick={()=> props.logouu()}>Logout</span>
        </li>
        </> :<>
        <li className="nav-item ">
          <Link className="nav-link " aria-current="page" to={'Login'} >Login</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" aria-current="page" to={'Register'}>Register</Link>
        </li>        
        </>}
      </ul>

    </div>
  </div>
</nav>
  )
}
