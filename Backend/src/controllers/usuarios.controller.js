const db = require('../db/db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ message: 'No existe el usuario' });

        const usuario = result.rows[0];
        const esValida = await bcrypt.compare(password, usuario.password);
        
        if (!esValida) return res.status(401).json({ message: 'Clave incorrecta' });

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET || '123456', { expiresIn: '8h' });
        res.json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


exports.registrar = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)',
            [nombre, email, hashedPass, rol || 'empleado']
        );
        res.status(201).json({ message: 'Usuario creado' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


exports.getUsuarios = async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre, email, rol FROM usuarios');
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};