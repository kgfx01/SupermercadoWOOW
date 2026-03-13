const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const app = express();

const productRoutes = require('./routes/product.route.js');
const proveedorRoutes = require('./routes/proveedor.route.js'); 
const ordenRoutes = require('./routes/orden.route.js'); 
const usuariosRoutes = require('./routes/usuarios.route.js');


app.use(cors());
app.use(express.json());

app.use('/api/productos', productRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ordenes', ordenRoutes); 
app.use('/api/usuarios', usuariosRoutes); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});