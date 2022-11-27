import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '..'
import { authRoutes, moderatorRoutes, publicRoutes } from '../routes'
import { LOGIN_ROUTE } from '../utils/consts'

const AppRouter = observer (() => {
  const {user} = useContext(Context)
  
  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) => 
          <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {user.isAuth && user.role === 'MODERATOR' && moderatorRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>} exact/>
        )}
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>} exact/>            
        )}
        <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
    </Routes>   
  )
})

export default AppRouter