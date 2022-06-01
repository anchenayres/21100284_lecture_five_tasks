import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {


    const [inputs, setInputs] = useState({
        first: '',
        last: '',
        email: '',
        username: '',
        password: '',
        passwordCon: '',

    });

    const [nameError, setNameError] = useState();
    const [lastError, setLastError] = useState();
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordConError, setPasswordConError] = useState();


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
                setEmailError();
            } else if(response.data === "Not Available"){ 
                setEmailError("This Email is not Available")
            } else if(response.data === '') {
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
                setUsernameError();
            } else if(response.data === "Not Available"){ 
                setUsernameError("This Username is not Available")
            } else if(response.data === '') {
                setUsernameError();
            }
        });
    }

    const passwordVal = ( e ) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;

        const value = e.target.value;
        setInputs({...inputs, password: value});
        if(inputs.password !== '') {
            setPasswordError();
        }

        if(!value.match(passwordRegex)){
            setPasswordError('Password does not meed the criteria')
        }
    }

    const passwordConVal = ( e ) => {
        const value = e.target.value;
        setInputs({...inputs, passwordCon: value});
        if(inputs.password === value) {
            setPasswordConError();
        } else {
            setPasswordConError('Your passwords does not match.')
        }
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();


        if(inputs.first === ''){
            setNameError('What is your name');
            console.log('hey')
        } else {
            setNameError();
        }

        if(inputs.last === ''){
            setLastError('What is your name')
        } else {
            setLastError();
        }

        if(inputs.email === ''){
            setEmailError('What is your name')
        } else {
            setEmailError();
        }

        if(inputs.username === ''){
            setUsernameError('What is your name')
        } else {
            setUsernameError();
        }

        if(inputs.password === ''){
            setPasswordError('What is your name')
        } else {
            setPasswordError();
        }

        if(inputs.passwordCon === ''){
            setPasswordConError('What is your name')
        } else {
            setPasswordConError();
        }

        let result = Object.values( inputs ).some(item => item === '' );

        if( result ) {
            console.log('There is an Error');
            alert('ge')
        } else {
            axios.post( 'http://localhost/api/addUSer.php', inputs )
            .then( ( res ) => {
                console.log(res);
                if( res.status === 200 ) {
                }
            } );
        }
    }


    return (
      <div>
          <form>
              <h1>Sign Up to Trackalot</h1>
              <p>Please fill in your details below</p>
              <div className='names'>
                  <input name="first" className='left' type="text" placeholder='First Name' onChange={firstVal}/>
                  <h5>{nameError}</h5>
                  <input name='last' type="text" placeholder='Last Name' onChange={lastVal}/>
                  <h5>{lastError}</h5>
              </div>      
              <div className='statusIcon'>
                  <img src=""/>
              </div>
              <div className='emailCon'>
              <input name="email" type="email" placeholder='Your Email' onChange={emailVal} onBlur={validateEmail}/>
              </div>
              <h5>{emailError}</h5>
              <div className='userCon'>
                  <div className='statusIconUser'>
                      <img src=""/>
                  </div>
                  <input name="username" className='left' type="username" placeholder='Enter Username' onChange={userNameVal} onBlur={validateUser}/>
                  <h5>{usernameError}</h5>
              </div>
              <div className='passCon'>
                  <input name="password" type="password" placeholder='Enter Password' onChange={passwordVal}/>
                  <h5>{passwordError}</h5>
                  <input name="conPass" type="password" placeholder='Confirm Password' onChange={passwordConVal}/>
                  <h5>{passwordConError}</h5>
              </div>
              <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
              
      </div>
    )
  }
  
  export default Register;
  