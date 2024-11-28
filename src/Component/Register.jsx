import axios from 'axios'
import Joi, { number } from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let [allr , setallr] = useState([])
  let [relode , setrelode] = useState(false)
  let [error , seterror] = useState('')
  let we = useNavigate()
  let [user , setuser] = useState({
    userName: '',
    dateOfBirth:'' ,
    email:'' ,
    password:'' ,
    rePassword:'' 

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
            let api = await axios.post('http://hawas.runasp.net/api/v1/Register', user);
            if (api.status === 201) {
                setrelode(false);
                we('/Login');
            } 
        } catch (err) {
            setrelode(false);
            seterror('no found please agine');
        }
    }
}
  function style(){
    let reg = Joi.object({
      userName: Joi.string().alphanum().min(3).max(20).required(),
      dateOfBirth:Joi.string().min(3).max(2000).required() ,
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) ,
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      rePassword:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 

    })

    return reg.validate(user , {abortEarly: false})
  }



  return (
    <>
    
    <div className='container-r'>
    { allr.map((el)=><div className='alert alert-danger'>{el.message}</div>) } 

   { error ? <div className='alert alert-danger'>{error}</div>  : '' } 
    <h2 className='mb-5'>Register Form</h2>
    <form  onSubmit={stopform}>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='FirstName' >user Name :</label>
        <input onChange={send} id='FirstName' type='text' name='userName' className='w-75'></input>
       </div>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='Age' >dateOfBirth:</label>
        <input onChange={send} id='Age' type='date' name='dateOfBirth' className='w-75'></input>
       
       </div>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='Email' >Email:</label>
        <input onChange={send} id='Email' type='email' name='email' className='w-75'></input>
       
       </div>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='password' >password:</label>
        <input onChange={send} id='password' type='password' name='password' className='w-75'></input>
       
       </div>
       <div className='d-flex flex-column mb-3'>
        <label htmlFor='rePassword' >rePassword:</label>
        <input onChange={send} id='rePassword' type='password' name='rePassword' className='w-75'></input>
        
       </div>
        <button type='submit'>{relode ===true ?<li className='fa fa-spinner fa-spin'/> : 'Register'}</button>
      
      
    </form>
  
    </div>

    
    </>
  )
}

