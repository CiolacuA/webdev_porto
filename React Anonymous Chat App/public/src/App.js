import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import SetNickname from "./components/SetNickname";
import Chat from "./pages/Chat";
import CreateRoom from "./pages/CreateRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Europe from "./pages/Europe";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/setNickname" element={<SetNickname />}></Route>
        <Route path="/createRoom" element={<CreateRoom />}></Route>
        <Route path="/europe" element={<Europe />}></Route>
        
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
