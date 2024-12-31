import express from 'express';
import Product from '../models/productModal.js';  // Adjust path as needed

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('formulations.formulaId');  // Populate formulas if needed
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products', message: err.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const {
      articleName,
      image,
      articleNo,
      mouldingTemp,
      formulations,
      mouldNo,
      noOfCavity,
      cycleTime,
      expectedCycles,
      noOfLabours,
      hardness,
      lastUpdated,
    } = req.body;

    const newProduct = new Product({
      articleName,
      image,
      articleNo,
      mouldingTemp,
      formulations,
      mouldNo,
      noOfCavity,
      cycleTime,
      expectedCycles,
      noOfLabours,
      hardness,
      lastUpdated,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error saving product', message: err.message });
  }
});

export default router;
