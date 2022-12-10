import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check, getOneUser } from "./http/userAPI";


const App = observer (() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      console.log(data)
      user.setUser(data)      
      user.setIsAuth(true)
      user.setIsBlocked(data.isBlocked)
      user.setRole(data.role)
      user.setId(data.id)
      user.setEmail(data.email)
    }).finally(() => setLoading(false))

    setTimeout(() => {  getOneUser(user.id).then(data => {      
      user.setName(data.name)
      user.setAddress(data.address)
      user.setPhone(data.phone)
      
    }) }, 50);
    
  },[])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>    
  );
})

export default App;
