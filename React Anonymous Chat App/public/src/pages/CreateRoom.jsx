/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoomRoute } from "../utils/APIRoutes";

export default function CreateRoom() {
  const navigate = useNavigate();

  const [currentUsername, setCurrentUserName] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);

  }, []);


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
    name: "",
    type: true,
    password: null,
    owner: ""
  });


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const {type, password, owner} = values;

    if(owner !== currentUsername)
    {
        toast.error("👮‍♀️:Te-am prins! Nu incerca să schimbi în Inspect Element", toastOptions);
        return false;
    }else if(type===true && password !== null)
        {
            toast.error("Dacă ai ales să creezi o cameră publică, lasă câmpul parolei necompletat", toastOptions);
            return false;
        }else if(type===false && password === null)
            {
                toast.error("Dacă ai lăsat nebifată căsuța, vei crea o cameră privată - deci o parolă este necesară", toastOptions);
                return false;
            }
    else 
    {
    return true;}
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { name, type, password, owner } = values;
      const { data } = await axios.post(createRoomRoute, {
        name,
        type,
        password,
        owner
      })

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.room)
        );
        navigate("/");
      }
    }

}

  return (
    <>
    <ToastContainer></ToastContainer>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand" onLoad={(e)=>toast.success("👩‍🎓: Bine ai ajuns în Creatorul de camere al Chatzoniei! Creează o cameră acum sau întoarce-te la prietenii tăi", toastOptions2)}>
          <img src={Logo} alt="logo" />
          <h1>Creează o cameră</h1>
          <input type="text" placeholder="Numele camerei" name='roomname' onClick={(e) => toast.info(`👩‍🎓: Asigură-te că numele camerei nu este folosit și este mai mare de 5 caractere.`, toastOptions3)} onChange={(e)=>handleChange(e)} />
          <input type="checkbox" defaultChecked name='type' id="type" onClick={(e)=>toast.info("👩‍🎓: Bifat = cameră publică, Nebifat = cameră privată", toastOptions3)} onChange={(e)=>handleChange(e)} />
          <label htmlFor="type">Bifează pentru cameră publică, debifează pentru cameră privată</label>
          <input type="password" id="pass" placeholder="***********" name='password' onClick={(e)=>toast.info("👩‍🎓: Asigură-te că folosești o parolă puternică 👮‍♀️ Sfat: această parolă se poate comunica prietenilor sau utilizatorilor pe care îi doriți în această cameră, dacă lăsați această căsuță bifată, parola camerei va fi goală.", toastOptions3)} onChange={(e)=>handleChange(e)} />
          <input type="text" disabled defaultValue={currentUsername} name='owner' onClick={(e) => toast.info(`👩‍🎓: Deocamdată nu poți crea o cameră pentru altcineva, doar tu esti creatorul`, toastOptions3)} onChange={(e)=>handleChange(e)} />
          <button type="submit">Creare cameră</button>
          <span>Te-ai răzgândit? <Link to={"/"}>Înapoi la prietenii tăi</Link></span>
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
  h1, label {
    color: white;
    text-transform: uppercase;
  }
  input[type=checkbox]{
    width: fit-content;
  }
  label{
    
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
input[type="text"]:disabled {
    background: #bda6a252;
    text-align: center;
    color: darkgrey;
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