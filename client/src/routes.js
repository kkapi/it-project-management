import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import FoodPage from "./pages/FoodPage"
import ForgotPassword from "./pages/ForgotPassword"
import Moderator from "./pages/Moderator"
import RecoveryPassword from "./pages/RecoveryPassword"
import Shop from './pages/Shop'
import { BASKET_ROUTE, FOOD_ROUTE, FORGOT_PASS_ROUT, LOGIN_ROUTE, MODERATOR_ROUTE, RECOVERY_PASS_ROUT, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [    
    {
        path: BASKET_ROUTE,
        Component: Basket
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