import Admin from "./pages/Admin"
import AdminOrders from "./pages/AdminOrders"
import AdminUsers from "./pages/AdminUsers"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import FoodPage from "./pages/FoodPage"
import ForgotPassword from "./pages/ForgotPassword"
import Moderator from "./pages/Moderator"
import NewOrder from "./pages/NewOrder"
import Order from "./pages/Order"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import RecoveryPassword from "./pages/RecoveryPassword"
import Shop from './pages/Shop'
import { ADMIN_ORDERS_ROUTE, ADMIN_ROUTE, ADMIN_USERS_ROUTE, BASKET_ROUTE, FOOD_ROUTE, FORGOT_PASS_ROUT, LOGIN_ROUTE, MODERATOR_ROUTE, NEW_ORDER_ROUTE, ORDERS_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, RECOVERY_PASS_ROUT, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [ 
    {
        path: PROFILE_ROUTE + '/:id',
        Component: Profile
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: NEW_ORDER_ROUTE,
        Component: NewOrder
    },
    {
        path: ORDER_ROUTE + '/:id',
        Component: Order
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: FOOD_ROUTE + '/:id',
        Component: FoodPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: FORGOT_PASS_ROUT,
        Component: ForgotPassword
    },
    {
        path: RECOVERY_PASS_ROUT + '/:link',
        Component: RecoveryPassword
    }
]

export const moderatorRoutes = [
    {
        path: MODERATOR_ROUTE,
        Component: Moderator
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_ORDERS_ROUTE,
        Component: AdminOrders
    },
    {
        path: ADMIN_USERS_ROUTE,
        Component: AdminUsers
    }
]