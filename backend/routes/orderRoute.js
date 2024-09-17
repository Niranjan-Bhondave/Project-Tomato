import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder,verifyOrder,userOrders,listOrders } from '../controller/orderController.js';

const orderRouter = express.Router();
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders', authMiddleware, userOrders);
orderRouter.post('/listOrders', listOrders);
export default orderRouter;