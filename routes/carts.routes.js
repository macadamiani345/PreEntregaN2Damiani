import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('./data/carts.json');

// 1. POST /: Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await manager.createCart();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(500).json({ error: "Error al crear carrito" });
    }
});

// 2. GET /:cid: Listar productos de un carrito específico
router.get('/:cid', async (req, res) => {
    try {
        const cart = await manager.getCartById(Number(req.params.cid));
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener carrito" });
    }
});

// 3. POST /:cid/product/:pid: Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await manager.addProductToCart(Number(cid), Number(pid));
        
        if (result) {
            res.json({ message: "Producto agregado al carrito" });
        } else {
            res.status(400).json({ error: "No se pudo agregar el producto" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
});

export default router;
