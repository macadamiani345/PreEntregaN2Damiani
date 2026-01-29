import fs from 'fs';
import path from 'path';

class ProductManager {
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

    getProducts() {
        return this.read();
    }

    getProductById(id) {
        return this.read().find(p => p.id === id);
    }

    addProduct(productData) {
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        if (!requiredFields.every(field => productData[field])) {
            throw new Error('Faltan campos obligatorios');
        }

        const products = this.read();
        if (products.some(p => p.code === productData.code)) {
            throw new Error('El código del producto ya existe');
        }

        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...productData,
            status: productData.status !== undefined ? productData.status : true,
            thumbnails: productData.thumbnails || []
        };

        products.push(newProduct);
        this.write(products);
        return newProduct;
    }

    updateProduct(id, updateData) {
        const products = this.read();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) throw new Error('Producto no encontrado');
        
        delete updateData.id;
        products[index] = { ...products[index], ...updateData };
        this.write(products);
        return products[index];
    }

    deleteProduct(id) {
        const products = this.read();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) throw new Error('Producto no encontrado');
        
        products.splice(index, 1);
        this.write(products);
        return true;
    }
}

export default ProductManager;