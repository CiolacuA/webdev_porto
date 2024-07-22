/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Rooms({ rooms, changeRoom }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelectedRoom, setCurrentSelectedRoom] = useState(undefined);
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);

  }, []);

  const changeCurrentRoom = (index, room) => {
    setCurrentSelectedRoom(index);
    changeRoom(room);
  }

  const navEurope = () => { 
    navigate("/europe")
}

  return (
    <>
      {(currentUserName && currentUserImage) && (
        <Container>
          <div className="brand">
            <h3> Camere </h3>
          </div>          
          <div className="rooms">
            <h3 className="room-title">Camere publice</h3>
            <div className="room" onClick={navEurope}><h3>Camera publică 1</h3></div>
            <div className="room"><h3>Camera publică 2</h3></div>
            <div className="room"><h3>Camera publică 3</h3></div>
            <div className="room"><h3>Camera publică 4</h3></div>
            <div className="room"><h3>Camera publică 5</h3></div>
            <div className="room"><h3>Camera publică 6</h3></div>
            <div className="room"><h3>Camera publică 7</h3></div>
            {rooms.map((room, index) => {
              return (
                <div
                  key={room._id}
                  className={`room ${
                    index === currentSelectedRoom ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentRoom(index, room)}
                >
                  <div className="roomName">
                    <h3>{room.name}({room.type})</h3>
                  </div>
                </div>
              );
            })}
            <h3 className="room-title">Camere private</h3>
            <div className="room"><h3>Camera privată 1</h3></div>
            <div className="room"><h3>Camera privată 2</h3></div>
            <div className="room"><h3>Camera privată 3</h3></div>
            <div className="room"><h3>Camera privată 4</h3></div>
            <div className="room"><h3>Camera privată 5</h3></div>
            <div className="room"><h3>Camera privată 6</h3></div>
            <div className="room"><h3>Camera privată 7</h3></div>
            <div className="room"><h3>Camera privată 8</h3></div>

            {rooms.map((room, index) => {
              return (
                <div
                  key={room._id}
                  className={`room ${
                    index === currentSelectedRoom ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentRoom(index, room)}
                >
                  <div className="roomName">
                    <h3>{room.name}({room.type})</h3>
                  </div>
                </div>
              );
            })}

                      

          </div>
          <div className="room-menu"> 
            <div className="buttons">
              <Link id="create" to={"/CreateRoom"}>Creaza o camera</Link> <br />
              <Link id="join" to={"/join"}> Alatura-te unei camere </Link>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}


const Container = styled.div`
border-left: 0.1rem solid #ff222224;
border-right: 0.1rem solid #ff222224;

  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #2f0808;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3.75rem;
      border-radius: 50%;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .room-menu{
    border-top: 0.01rem solid #ff360034;
    .buttons {
      color: white;
      text-transform: uppercase;
      margin: 5px;
      a#join {
          color: #ffffff;
          width: -webkit-fill-available;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          background-color: orange;
          float: right;
          border-radius: 4%;
          padding: 5px;
          margin: 0.5rem 0;
          &:hover {
          color: #d53822;
        }
      }
      a#create {
          color: #ffffff;
          text-decoration: none;
          width: -webkit-fill-available;
          text-align: center;
          font-weight: bold;
          background-color: orange;
          border-radius: 4%;
          margin: 0.5rem 0;
          padding: 5px;
          float: left;
          &:hover {
          color: #d53822;
        }
      }
    }
  }
  }

  .rooms {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    height: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ff360034;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .room-title{
      color: white;
    background-color: red;
    width: -webkit-fill-available;
    text-align: -webkit-center;
    font-size: 1.5rem;
    }
    .room {
      justify-content: center;
      background-color: #ff360034;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }

      h3 {
        color: white;
      }



      .roomName {
        h3 {
          color: white;
        }
      }
    
    .selected {
      background-color: #f59b1e;
    }
  }

  .current-room {
    border-top: 0.01rem solid #ff360034;
    background-color: #3a0707;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .roomName {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .roomName {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
