
import { json, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Home from './Component/Home';
import Movice from './Component/Movice';
import People from './Component/people';
import Tvshow from './Component/Tvshow';
import Login from './Component/Login';
import Register from './Component/Register';
import NOfound from './Component/NOfound';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import Movied from './Component/Movied';
import Tvd from './Component/Tvd';

export default function App(){

  let [userdata , getuserdata] = useState(null)
  let navigate = useNavigate()


  function locals(){
      let x = localStorage.userToken
     let ex = jwtDecode(x)
     getuserdata(ex)
 
  }

 function ProtectedRoute(props){
  if(localStorage.getItem('userToken') === null){
    return <Navigate to='/Login'></Navigate>
  }
  else{
    return props.children
  }

 }
useEffect(()=>{
  if(localStorage.getItem('userToken')){
    locals()
  }
} ,[])

function logoute(){

getuserdata(null)
localStorage.removeItem('userToken')
navigate('/Login')

}



  return (<>
  
  <Navbar logouu={logoute}  data={userdata} />

  <div className='container'>
       <Routes>
       <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute> } ></Route>
        <Route path='Home' element={<ProtectedRoute><Home /></ProtectedRoute>} ></Route>
        <Route path='Movied' element={<ProtectedRoute><Movied /></ProtectedRoute> }>
        <Route path=':id' element={<ProtectedRoute><Movied /></ProtectedRoute> }/>
        </Route>
        <Route path='Tvd' element={<ProtectedRoute><Tvd /></ProtectedRoute> } >
        <Route path=':id' element={<ProtectedRoute><Tvd /></ProtectedRoute> }  />
        </Route>
        <Route path='Movice' element={<ProtectedRoute><Movice /></ProtectedRoute> } ></Route>
        <Route path='People' element={<ProtectedRoute><People /></ProtectedRoute>  } ></Route>
        <Route path='Tvshow' element={<ProtectedRoute><Tvshow /></ProtectedRoute>  } ></Route>
        <Route path='Login' element={ <Login lox={locals} />} ></Route>
        <Route path='Register' element={ <Register />} ></Route>
        <Route path='*' element={ <NOfound />} ></Route>
       </Routes>
  </div>

  <Footer />    
     
  </>
 
  );
} 



