const pool = require('../db/db');
//obtenemos las ordenes
exports.getOrders = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT oc.*, p.nombre AS proveedor 
            FROM ordenes_compra oc 
            JOIN proveedores p ON oc.id_proveedor = p.id 
            ORDER BY oc.id DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error en getOrders:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.postOrder = async (req, res) => {
    const { id_proveedor, id_producto, cantidad } = req.body;
    try {
       
        const newOrder = await pool.query(
            'INSERT INTO ordenes_compra (id_proveedor, fecha, estado, total) VALUES ($1, NOW(), $2, $3) RETURNING id',
            [id_proveedor, 'pendientes', 0]
        );
        const orderId = newOrder.rows[0].id;

        await pool.query(
            'INSERT INTO orden_detalles (id_orden, id_producto, cantidad) VALUES ($1, $2, $3)',
            [orderId, id_producto, cantidad]
        );

        res.status(201).json({ message: 'Orden creada correctamente' });
    } catch (error) {
        console.error("Error en postOrder:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        if (estado === 'completada') {
            const detalle = await pool.query('SELECT id_producto, cantidad FROM orden_detalles WHERE id_orden = $1', [id]);
            if (detalle.rows.length > 0) {
                const { id_producto, cantidad } = detalle.rows[0];
                await pool.query('UPDATE productos SET stock_actual = stock_actual + $1 WHERE id = $2', [cantidad, id_producto]);
            }
        }
        await pool.query('UPDATE ordenes_compra SET estado = $1 WHERE id = $2', [estado, id]);
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};