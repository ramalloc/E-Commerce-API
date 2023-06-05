const Product = require('../Models/Product');
const { verifyToken, verifyTokenAndAutharization, verifyTokenAndAdmin } = require('./verifyToken');

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



// GET ALL USERS 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // To get limited Users from the db or to use query in link/routes to limit the get users.
        const query = req.query.new;
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
    }
});



// GET USER STATUS
// this will return total users per month.
router.get("/status", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // this will gives last year

    try {
        // We are using mongoDB aggregiate to group the items
        const data = await User.aggregate([
            // First we have to write our condition
            { $match: { createdAt: { $gte: lastYear } } }, // It should be less than today and greater than past year

            // Taking month numbers to do that we use $project
            {
                $project: {
                    month: { $month: "$createdAt" }, // Just created Month variable here, It will take the month from "createdAt" and assign to month
                }
            },

            // grouping Items and users
            {
                $group: {
                    _id: "$month", // It should be unique therefore we chose month from above
                    total: { $sum: 1 }, // Getting total user
                },
            },

        ]);
        res.status(200).json(data); // This is returning the Total no. of IDs created in a month
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;