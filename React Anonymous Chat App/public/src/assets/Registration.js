import React, { useState } from 'react';
import { Axios } from 'axios';
import './App.css';

function App() {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [emailReg, setEmailReg] = useState('')

  const register = () =>{
    Axios.post('https://localhost:3000/register', {username: usernameReg, email: emailReg, password: passwordReg}).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }
  

  return (
    <div className="App">
      <div className='registration'>
        <h1>Creaza contul tau acum!</h1>
        <label>Nume utilizator: </label>
        <input type="text" onChange={(e) => {
          setUsernameReg(e.target.value);
        }}></input>

        
        <label>Email: </label>
        <input type="text" onChange={(e) => {
          setEmailReg(e.target.value);
        }}></input>


        <label>Parola: </label>
        <input type="password" placeholder='*********' onChange={(e) => {
          setPasswordReg(e.target.value);
        }}></input>
        <button onClick={register}> Inregistrare </button>
      </div>
      
    </div>
  );
}

export default App;
