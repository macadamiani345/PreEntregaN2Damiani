import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
    res.render('home', { products: await manager.getProducts() });
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { products: await manager.getProducts() });
});

export default router;
