/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
        autoClose: 9500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  }


  const toastOptions2 = {
    position: "top-left",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  }

  const toastOptions3 = {
    position: "top-right",
        autoClose: 9500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
  }
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const {password, confirmPassword, username, email} = values;
    if(password !== confirmPassword){
      toast.error("Parolele trebuie să coincidă", toastOptions);
      return false;
    } else if (username.length<5){
      toast.error("Lungimea numelui de utilizator ar trebui să fie mai mare de 5 caractere", toastOptions);
      return false;
    } else if (password.length<8){
      toast.error("Lungimea parolei trebuie să fie mai mare de 8 caractere", toastOptions
      );
      return false;
    } else if(email ===""){
    toast.error("Este necesară introducerea unei adrese de e-mail validă", toastOptions);
    return false;
  }

  return true;
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
        navigate("/");
      }
    }
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand" onLoad={(e)=>toast.success("👩‍🎓: Bine ai ajuns în Chatzonia! Te invităm să ni te alături! (click pentru a închide notificările)", toastOptions2)}>
          <img src={Logo} alt="logo" />
          <h1>Alatura-te ChatZoniei</h1>
          <input type="text" placeholder="Nume utilizator" name='username' onClick={(e) => toast.info(`👩‍🎓: Asigură-te că numele de utilizator nu este folosit și este mai mare de 5 caractere.`, toastOptions3)} onChange={(e)=>handleChange(e)} />
          <input type="email" placeholder="exemplu@host.com" name='email' onClick={(e)=>toast.info("👩‍🎓: Pentru a verifica contul trebuie să introduci o adresă de mail reală.", toastOptions3)} onChange={(e)=>handleChange(e)} />
          <input type="password" placeholder="***********" name='password' onClick={(e)=>toast.info("👩‍🎓: Asigură-te că folosești o parolă puternică 👮‍♀️ Sfat: schimbă parola regulat și nu folosi aceeași parolă pentru toate conturile; este pentru a te feri de 🕵", toastOptions3)} onChange={(e)=>handleChange(e)} />
          <input type="password" placeholder="***********" name='confirmPassword' onClick={(e)=>toast.info("👩‍🎓: Ai grijă! Parolele trebuie să coincidă.", toastOptions3)} onChange={(e)=>handleChange(e)} />
          <button type="submit">Inregistrare utilizator</button>
          <span>Esti deja Chatzonian? <Link to={"/login"}>Dovedeste-o</Link></span>
        </div>
      </form>
    </FormContainer>
    
    </>
  );
}

const FormContainer = styled.div`
overflow: scroll;
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
    height: 15vh;
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