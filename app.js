import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { createServer } from 'http';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import ProductManager from './managers/ProductManager.js';

const app = express();
const port = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);
const productManager = new ProductManager('./data/products.json');

// Función para emitir actualización de productos
const emitProductUpdate = async () => {
    const products = await productManager.getProducts();
    io.emit('updateProducts', products);
};

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Hacer io disponible en las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Configurar Socket.io
io.on('connection', (socket) => {
    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            emitProductUpdate();
        } catch (error) {
            socket.emit('error', error.message);
        }
    });
    
    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(id);
            emitProductUpdate();
        } catch (error) {
            socket.emit('error', error.message);
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});