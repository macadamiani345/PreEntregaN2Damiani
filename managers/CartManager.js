import fs from 'fs';
import path from 'path';

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }

    read() {
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    }

    write(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }

    createCart() {
        const carts = this.read();
        const newCart = {
            id: carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1,
            products: []
        };
        carts.push(newCart);
        this.write(carts);
        return newCart;
    }

    getCartById(id) {
        return this.read().find(c => c.id === id);
    }

    addProductToCart(cartId, productId) {
        const carts = this.read();
        const cart = carts.find(c => c.id === cartId);
        
        if (!cart) throw new Error('Carrito no encontrado');

        const product = cart.products.find(p => p.product === productId);
        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        
        this.write(carts);
        return cart;
    }
}

export default CartManager;