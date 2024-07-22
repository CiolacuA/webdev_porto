/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Bine te-am găsit, <span>{userName}!</span>
      </h1>
      <h3 className="welcome">Selectează unul dintre utilizatorii existenți pentru a începe o discuție.<br></br> Poți să creezi o cameră publică sau privată sau să te alături uneia! Spor la chat-uit!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #ffa500;
  }
  .welcome{
    padding: 5%
  }
`;
