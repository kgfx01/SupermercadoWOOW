const pool = require('../db/db');

exports.getProveedores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM proveedores ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProveedor = async (req, res) => {
    const { nombre, contacto, telefono, email, direccion } = req.body;
    try {
        await pool.query(
            'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5)',
            [nombre, contacto, telefono, email, direccion]
        );
        res.status(201).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre, contacto, telefono, email, direccion } = req.body;
    try {
        await pool.query(
            'UPDATE proveedores SET nombre=$1, contacto=$2, telefono=$3, email=$4, direccion=$5 WHERE id=$6',
            [nombre, contacto, telefono, email, direccion, id]
        );
        res.json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
        res.json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};