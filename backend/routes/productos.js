const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                "REGISTRO" as registro,
                "DESCRIPCION" as descripcion,
                "INGREDIENTE_ACTIVO" as ingrediente_activo,
                "PRODUCTO" as producto
            FROM productos
            ORDER BY "REGISTRO"`;
        
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener un producto por su registro
router.get('/:registro', async (req, res) => {
    try {
        const { registro } = req.params;
        const query = `
            SELECT 
                "REGISTRO" as registro,
                "DESCRIPCION" as descripcion,
                "INGREDIENTE_ACTIVO" as ingrediente_activo,
                "PRODUCTO" as producto
            FROM productos
            WHERE "REGISTRO" = $1`;
        
        const result = await db.query(query, [registro]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { descripcion, ingrediente_activo, producto } = req.body;

        const query = `
            INSERT INTO productos (
                "DESCRIPCION",
                "INGREDIENTE_ACTIVO",
                "PRODUCTO"
            ) VALUES ($1, $2, $3)
            RETURNING *`;

        const values = [descripcion, ingrediente_activo, producto];
        const result = await db.query(query, values);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un producto
router.put('/:registro', async (req, res) => {
    try {
        const { registro } = req.params;
        const { descripcion, ingrediente_activo, producto } = req.body;

        const query = `
            UPDATE productos
            SET 
                "DESCRIPCION" = $1,
                "INGREDIENTE_ACTIVO" = $2,
                "PRODUCTO" = $3
            WHERE "REGISTRO" = $4
            RETURNING *`;

        const values = [descripcion, ingrediente_activo, producto, registro];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto
router.delete('/:registro', async (req, res) => {
    try {
        const { registro } = req.params;

        const query = `
            DELETE FROM productos
            WHERE "REGISTRO" = $1
            RETURNING *`;

        const result = await db.query(query, [registro]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
