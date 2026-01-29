import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./data/products.json');

// GET: Listar todos o con límite
router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const { limit } = req.query;
        if (limit) {
            res.json(products.slice(0, Number(limit)));
        } else {
            res.json(products);
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// GET by ID
router.get('/:pid', async (req, res) => {
    try {
        const product = await manager.getProductById(Number(req.params.pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "No encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

// POST: Agregar 
router.post('/', async (req, res) => {
    try {
        const result = await manager.addProduct(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message || "Error al crear producto" });
    }
});

// PUT: Actualizar
router.put('/:pid', async (req, res) => {
    try {
        const success = await manager.updateProduct(Number(req.params.pid), req.body);
        if (success) {
            res.json({ message: "Actualizado" });
        } else {
            res.status(404).json({ error: "No encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

// DELETE
router.delete('/:pid', async (req, res) => {
    try {
        const success = await manager.deleteProduct(Number(req.params.pid));
        if (success) {
            res.json({ message: "Eliminado" });
        } else {
            res.status(404).json({ error: "No encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

export default router;