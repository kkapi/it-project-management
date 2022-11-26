import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { LOGIN_ROUTE } from '../utils/consts'

const AppRouter = () => {
  const isAuth = true
  return (
    <Routes>
        {isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>            
        )}
        <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
    </Routes>   
  )
}

export default AppRouter