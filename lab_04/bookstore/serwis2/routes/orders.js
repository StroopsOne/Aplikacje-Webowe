const express = require('express');
const Order = require('../models/Order');
const sequelize = require('../database/connection');

const router = express.Router();

// GET - Pobranie wszystkich zamówień użytkownika
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Dodanie nowego zamówienia
router.post('/', async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  if (!userId || !bookId || !quantity) {
    return res.status(400).json({ error: 'userId, bookId, and quantity are required.' });
  }

  try {
    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json({ id: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Usunięcie zamówienia
router.delete('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const deleted = await Order.destroy({ where: { id: orderId } });
    if (deleted) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH - Aktualizacja zamówienia
router.patch('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { quantity } = req.body;

  try {
    const updated = await Order.update({ quantity }, { where: { id: orderId } });
    if (updated[0]) {
      res.status(200).json({ message: 'Order updated successfully' });
    } else {
      res.status(404).json({ message: 'Order not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;