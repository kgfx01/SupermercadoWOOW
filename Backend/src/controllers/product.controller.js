const pool = require('../db/db');

exports.getDashboardTotals = async (req, res) => {
    try {
        const prodRes = await pool.query('SELECT COUNT(*) AS total FROM productos');
        const provRes = await pool.query('SELECT COUNT(*) AS total FROM proveedores');
        const ordRes = await pool.query('SELECT COUNT(*) AS total FROM ordenes_compra'); 

        res.json({
            productos: parseInt(prodRes.rows[0].total),
            proveedores: parseInt(provRes.rows[0].total),
            ordenes: parseInt(ordRes.rows[0].total) 
        });
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

exports.getLowStockProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos WHERE stock_actual <= stock_minimo');
        res.json(result.rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.postProduct = async (req, res) => {
    const { codigo, nombre, descripcion, precio, stock_minimo, stock_actual, categoria } = req.body;
    try {
        await pool.query(
            'INSERT INTO productos (codigo, nombre, descripcion, precio, stock_minimo, stock_actual, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [codigo, nombre, descripcion, precio, stock_minimo, stock_actual, categoria]
        );
        res.status(201).json({ message: 'OK' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, descripcion, precio, stock_minimo, stock_actual, categoria } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET codigo=$1, nombre=$2, descripcion=$3, precio=$4, stock_minimo=$5, stock_actual=$6, categoria=$7 WHERE id=$8',
            [codigo, nombre, descripcion, precio, stock_minimo, stock_actual, categoria, id]
        );
        res.json({ message: 'OK' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        res.json({ message: 'OK' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};