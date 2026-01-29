# Pre Entrega N°1 Backend I Damiani

Este es el repositorio correspondiente a la Pre Entrega N°1 del curso Backend I en Coderhouse, realizado por María Macarena Damiani.

## Descripción del Proyecto
El proyecto consiste en la creación de una API RESTful para la gestión de productos y carritos de compra utilizando Node.js y Express. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y carritos almacenados en archivos JSON. 

## Tecnologías Utilizadas
- Node.js
- Express      

## Instalación
1. Clona este repositorio en tu máquina local:
2. Colocar el comando npm install para instalar las dependencias necesarias en la terminal.
3. Ejecutar el comando node app.js para iniciar el servidor.
4. La API estará disponible en `http://localhost:8080`.

## Endpoints

### Productos
- `GET /api/products`: Obtiene todos los productos (acepta ?limit=n para limitar resultados).
- `GET /api/products/:pid`: Obtiene un producto por su ID.
- `POST /api/products`: Crea un nuevo producto.
- `PUT /api/products/:pid`: Actualiza un producto existente por su ID.
- `DELETE /api/products/:pid`: Elimina un producto por su ID.

### Carritos
- `POST /api/carts`: Crea un nuevo carrito vacío.
- `GET /api/carts/:cid`: Obtiene los productos de un carrito específico.
- `POST /api/carts/:cid/product/:pid`: Agrega un producto al carrito (incrementa quantity si ya existe).