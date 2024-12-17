import { Router } from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ServiceRoutes } from "../modules/Service/service.route";
import { ProductRoutes } from "../modules/Products/product.route";
import { OrderRoutes } from "../modules/Order/order.route";

const router = Router()
const moduleRoutes = [
    {
        path:'/auth',
        route : AuthRoutes
    },
    {
        path:'/user',
        route : UserRoutes
    },
    {
        path:'/service',
        route : ServiceRoutes
    },
    {
        path:'/product',
        route : ProductRoutes
    },
    {
        path:'/order',
        route : OrderRoutes
    },
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))

export default router