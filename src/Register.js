import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {


    const {inputs, setInputs} = useState({
        first: '',
        last: '',
        email: '',
        username: '',
        contact: '',
        password: '',
        passwordCon: '',

    });

    const [nameError, setNameError] = useState();
    const [lastError, setLastError] = useState();
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [contactError, setContactError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordConError, setPasswordConError] = useState();

    const [emailAvail, setEmailAvail] = useState();
    const [userAvail, setUserAvail] = useState();

    const firstVal = (e) => { //e is for events
        const value = e.target.value;
        setInputs({...inputs, first: value});
        if(inputs.first !== ''){setNameError();}
    }

    const lastVal = (e) => { //e is for events
        const value = e.target.value;
        setInputs({...inputs, last: value});
        if(inputs.last !== ''){setLastError();}
    }

    const emailVal = (e) => { //e is for events
        const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".*"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0,9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = e.target.value;
        setInputs({...inputs, email: value});
        if(inputs.email !== ''){setEmailError();}
        if(!value.match(mailRegex)) {
            setEmailError("Email is not a valid format");
        }
    }

    const validateEmail = () => {
        axios.post('http://localhost:8888/api/authenticateEmail.php', inputs)
        .then(function(response) {
            console.log(response);
            if(response.data === "Available") {
                setEmailAvail();
            } else if(response.data === "Not Available"){ 
                setEmailError("This Email is not Available")
            } else if(response.data === '') {
                setEmailAvail();
                setEmailError();
            }
        });
    }

    const userNameVal = (e) => { //e is for events
        const value = e.target.value.trim();
        setInputs({...inputs, username: value});
        if(inputs.username !== ''){setUsernameError();}
    }

    const validateUser = () => {
        axios.post('http://localhost:8888/api/authenticateUser.php', inputs)
        .then(function(response) {
            console.log(response);
            if(response.data === "Available") {
                setUserAvail();
            } else if(response.data === "Not Available"){ 
                setUserAvail("This Username is not Available")
            } else if(response.data === '') {
                setUserAvail();
                setUsernameError();
            }
        });
    }


    return (
      <div>
          <form>
              <h1>Sign Up to Trackalot</h1>
              <p>Please fill in your details below</p>
              <div className='names'>
                  <input name="first" className='left' type="text" placeholder='First Name' />
                  <p>{nameError}</p>
                  <input name='last' type="text" placeholder='Last Name'/>
                  <p>{lastError}</p>
              </div>      
              <div className='statusIcon'>
                  <img src=""/>
              </div>
              <div className='emailCon'>
              <input name="email" type="email" placeholder='Your Email'/>
              </div>
              <p>{emailError}</p>
              <div className='userCon'>
                  <div className='statusIconUser'>
                      <img src=""/>
                  </div>
                  <input name="username" className='left' type="username" placeholder='Enter Username' />
              </div>
              <div className='passCon'>
                  <input name="password" type="password" placeholder='Enter Password' />
                  <input name="conPass" type="password" placeholder='Confirm Password'/>
                  <p>{emailError}</p>
              </div>
              <button type="submit">Submit</button>
          </form>
              
      </div>
    )
  }
  
  export default Register;
  