const express = require('express');
const Product = require('../models/product');
const Counter = require('../models/counter');

const router = express.Router();


router.use(async (req, res, next) => {
    if (req.method === 'POST' && req.path === '/') {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'productid' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        req.body._id = counter.seq;
    }
    next();
});

// CRUD 
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
