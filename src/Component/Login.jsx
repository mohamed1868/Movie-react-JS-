import React , { useEffect, useState } from 'react'
import axios from 'axios'
import Joi, { number } from 'joi'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  let [allr , setallr] = useState([])
  let [relode , setrelode] = useState(false)
  let [error , seterror] = useState('')
  let we = useNavigate()
  let [user , setuser] = useState({
    email:'' ,
    password:'' ,
  })

  function send(x){
    let update ={...user}
    update[x.target.name] = x.target.value
    setuser(update)
 
  }
  async function stopform(e) {
    setrelode(true);
    e.preventDefault();
    let x = style();
    if (x.error) {
        setallr(x.error.details);
        setrelode(false);
    } else {
        try {
            let api = await axios.post('http://hawas.runasp.net/api/v1/Login', user);
            if (api.status === 200) {
                setrelode(false);             
                localStorage.userToken = api.data.jwt
                props.lox()
                we('/Home');
            } 
        } catch (err) {
            setrelode(false);
            seterror('no found please Register');
        }
    }
}
  function style(){
    let reg = Joi.object({

      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) ,
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


    })

    return reg.validate(user , {abortEarly: false})
  }

  useEffect(()=>{
    if(localStorage.userToken){
      we('/Home')
    }
  } , [])



  return (
    <>
    
    <div className='container-r'>
    { allr.map((el)=><div className='alert alert-danger'>{el.message}</div>) } 

   { error ? <div className='alert alert-danger'>{error}</div>  : '' } 
    <h2 className='mb-5'>Login Form</h2>
    <form  onSubmit={stopform}>

       <div className='d-flex flex-column mb-3'>
        <label htmlFor='Email' >Email:</label>
        <input onChange={send} id='Email' type='email' name='email' className='w-75'></input>
       
       </div>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='password' >password:</label>
        <input onChange={send} id='password' type='password' name='password' className='w-75'></input>
       
       </div>

        <button type='submit'>{relode ===true ?<li className='fa fa-spinner fa-spin'/> : 'Login'}</button>
      
      
    </form>
  
    </div>

    
    </>
  )
}
