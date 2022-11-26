import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes } from '../../routes'
import { LOGIN_ROUTE } from '../utils/consts'

const AppRouter = () => {
  const isAuth = false
  return (
    <Routes>
      {authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
    </Routes>
  )
}

export default AppRouter