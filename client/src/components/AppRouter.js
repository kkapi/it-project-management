import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '..'
import { adminRoutes, authRoutes, moderatorRoutes, publicRoutes, userRoutes } from '../routes'
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'

const AppRouter = observer (() => {
  const {user} = useContext(Context)
  
  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) => 
          <Route key={path} path={path} element={<Component/>}/>
        )}
        {user.isAuth && user.role === 'MODERATOR' && moderatorRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>}/>
        )}
        {user.isAuth && user.role === 'ADMIN' && adminRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>}/>
        )}
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>}/>            
        )}
        {user.isAuth && <Route path='*' element={<Navigate to={SHOP_ROUTE}/>}/>}
        {!user.isAuth && <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>}
    </Routes>   
  )
})

export default AppRouter