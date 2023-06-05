const Product = require('../Models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


// CREATE 
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});







// UPDATE IN Product 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    // Now we have to update the requests on server
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, { new: true }
        );
        // To send update Product
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});



// DELETE Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});



// GET Product 
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
});



// GET ALL Products
// We are adding here two queries to fetch all products and also according to the categories. 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    // To get limited Products 
    const qNew = req.query.new;

    // To get category vise Products 
    const qCategories = req.query.categories;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategories) {
            products = await Product.find({
                categories: {
                    $in: [qCategories],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;