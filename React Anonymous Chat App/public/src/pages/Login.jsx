/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
        autoClose: 9500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  };


  const toastOptions2 = {
    position: "top-left",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Numele de utilizator și parola sunt necesare pentru autentificare", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Numele de utilizator și parola sunt necesare pentru autentificare", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/setAvatar");
      }
    }
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand" onLoad={(e)=>toast.success(`👩‍🎓: Bine ai revenit! Prietenii tai asteapta!`, toastOptions2)}>
          <img src={Logo} alt="logo" />
          <h1>Portalul spre Chatzonia</h1>
          <input type="text" min={3} placeholder="Nume utilizator" name='username' onChange={(e)=>handleChange(e)} />
          <input type="password" placeholder="***********" name='password' onChange={(e)=>handleChange(e)} />
          <button type="submit">Autentificare</button>
          <span>Oh... nu ești Chatzonian? <Link to={"/register"}>Semnează aici</Link></span>
        </div>
      </form>
    </FormContainer>
    
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #580e0e;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
  img {
    height: 15rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #ffa500;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #ff5200;
    outline: none;
  }
}
button {
  background-color: #ff2b0e;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #d53822;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #ff2b0e;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #d53822;
    }
  }
  
}
`;