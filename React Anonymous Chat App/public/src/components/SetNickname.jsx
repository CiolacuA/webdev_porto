/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setNicknameRoute } from "../utils/APIRoutes";


export default function SetNickname() {
  const navigate = useNavigate();
  const [nicknames, setNicknames] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const { uniqueNamesGenerator, adjectives, colors, starWars } = require('unique-names-generator');

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };



  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
  }, []);


  const setTempNickname = async () => {
    if (selectedNickname === undefined) {
        toast.info("Te vei alatura chat-ului cu fosta ta poreclă", toastOptions);
        setTimeout(() => {
            navigate("/");
        },5000)
        clearTimeout();
    } else {
      const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const { data } = await axios.post(`${setNicknameRoute}/${user._id}`, {
        nickname: nicknames[selectedNickname],
      });

      if (data.isSet) {
        user.isNicknameSet = true;
        user.nickname = data.nickname;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        toast.info("Poreclă setată! - se continuă la chat", toastOptions);
        setTimeout(() => {
            navigate("/");
        },5000)
        clearTimeout();
      } else if(!data.isSet) {
        toast.info("Porecla nouă nu a fost setată! - se continuă la chat cu porecla veche", toastOptions);
        setTimeout(() => {
            user.isNicknameSet = false;
            user.nickname = data.username;
            navigate("/");
        },5000)
        clearTimeout();
      }
    }
  }

  const setUserasNick = async () =>{
    toast.info("Te vei alatura chat-ului cu numele tau de utilizator", toastOptions);
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        
        const { data } = await axios.post(`${setNicknameRoute}/${user._id}`, {
          isNicknameSet: false,
          nickname: currentUserName,
        });
  
        if (data.isSet) {
          user.isNicknameSet = false;
          user.nickname = data.username;
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(user)
          );
          setTimeout(() => {
            navigate("/");
        },5000)
        clearTimeout()
      
  }
}

//e bine
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, starWars], separator: " ", style: "capital" , length: 2});
      data.push(randomName);
    }
    setNicknames(data);
  }, []);

  return (
    <>
        <Container>
          <div className="title-container">
            <h1>Mod incognito</h1> <br></br> 
          </div>
          <div className="container">
          <p className="rules">Salut! În modul incognito poți să îți setezi o poreclă temporară pentru a te alătura camerelor publice. <br></br>Nu îți face griji, aceasta este generată aleator și trebuie setată de fiecare dată când decizi să te alături în modul incognito. <br /> <br></br> <span className="warning">ATENȚIE!</span> Dacă totuși selectezi o poreclă și incalci regulile bunelor maniere în camerele publice, tot vei fi identificat de către administratori și vei fi avertizat - avertizarea repetată duce la eliminarea permanentă sau temporară din cameră. <br></br><br></br>
          <span className="info">NOTĂ:</span> Chiar dacă ai setată o poreclă, numele afișat în cadrul camerelor private va fi cel de utilizator </p>
          <div className="random-funny">
              {nicknames.map((nickname, indexname) => {
                  return (
                    <div className={`nickname ${selectedNickname === indexname ? "selected" : ""}`}
                    >
                      <span className="funny-name"  key={nickname} onClick={() => setSelectedNickname(indexname)}>{nickname}</span>
                    </div>
                  );
                })}
              
            </div>
            <button onClick={setTempNickname} className="submit-btn">Setează poreclă</button>

            <button onClick={setTempNickname} className="submit-btn">Continuă cu vechea poreclă</button>
          
          
          <button onClick={setUserasNick} className="submit-btn">
            Continuă cu numele de utilizator
          </button>
          </div>
          
            
          <ToastContainer />
        </Container>
    </>
  );
}

const Container = styled.div`
overflow: scroll;
  display: grid;
  grid-template-rows: 15% 70% 15%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #580e0e;
  height: 100vh;
  width: 100vw;

  .rules{
    background-color: #ff7c003b;
    padding: 0.5%
  }

  .warning{
    color: red;
    font-weight: bold;
    background-color: white;
    padding: 2px;
    border-radius: 10px;
  }

  .info{
    color: blue;
    font-weight: bold;
    background-color: white;
    padding: 2px;
    border-radius: 10px;
  }

  h1{
    text-align: center;
  }

  p{
    color: white;
    font-size: 1.25rem;
    padding: 0;
  }

  .container{
    display: grid;
    justify-content: center;
    grid-template-rows: 5% 80% 10%;
    align-items: center;
    padding: 5%;
  }

  .random-funny{
    background-color:#d53822;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    overflow: auto;
    height: 25vh;
    cursor: pointer; 
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #fdff00a8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .nickname{
      color: white;
    }
    .selected {
      background-color: #ff2b0e;
    }
  }



  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      
    }
  }

  .submit-btn {
  margin: 5px;
  width: auto;
  background-color: #ff2b0e;
  text-align: center;
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
`;
