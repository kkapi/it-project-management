import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import FoodPage from "./pages/FoodPage"
import Moderator from "./pages/Moderator"
import Shop from './pages/Shop'
import { BASKET_ROUTE, FOOD_ROUTE, LOGIN_ROUTE, MODERATOR_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: MODERATOR_ROUTE,
        Component: Moderator
    },
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
]