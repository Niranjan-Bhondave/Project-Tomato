import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();
cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart);
cartRouter.get('/get', getCart);

export default cartRouter;