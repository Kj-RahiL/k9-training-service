import { Router } from "express";
import { OrderController } from "./order.controller";
import Auth from "../../middleware/auth";
import { USER_ROLE } from "../User/user.constant";


const router = Router()

// create order
router.post('/', Auth(USER_ROLE.trainer, USER_ROLE.user), OrderController.createOrder)

// get order by user
router.get('/',  Auth(USER_ROLE.trainer, USER_ROLE.user), OrderController.getOrderByUser)

// get all order by admin
router.get('/admin', Auth(USER_ROLE.admin), OrderController.getAllOrderByAdmin)

// update order quantity
router.put('/', Auth(USER_ROLE.trainer, USER_ROLE.user), OrderController.updateOrderQuantity)

// delete order
router.delete('/:id', OrderController.deleteOrder)


export const OrderRoutes = router