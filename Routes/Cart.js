const Cart = require('../Models/Cart');
const { verifyToken, verifyTokenAndAutharization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


// ADD CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});







// UPDATE IN CART 
router.put("/:id", verifyTokenAndAutharization, async (req, res) => {
    // Now we have to update the requests on server
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        }, { new: true }
        );
        // To send update Product
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});



// DELETE CART
router.delete("/:id", verifyTokenAndAutharization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});



// GET USER CART 
router.get("/find/:userId", verifyTokenAndAutharization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json(err);
    }
});



// GET ALL Products
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;