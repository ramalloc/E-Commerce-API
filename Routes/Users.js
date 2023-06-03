const User = require('../Models/User');
const { verifyToken, verifyTokenAndAutharization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


// UPDATE IN USER

// router.put("/:id", verifyToken, (req, res) => { // we used put here because we are updating here. And We need a middleware to verify our json id (Verify Token)
//     // So first we have to check that wheather the id is belongs to clients/admin or not.
//     // if(req.user.id === req.params.id || req.user.isAdmin){
//     // } // If we write it like this then we have to create it again and again, therefore we create this function in verifyToken.js and import it.
// }); 

router.put("/:id", verifyToken, verifyTokenAndAutharization, async (req, res) => {
    // If user updated their password then we have to encrypt the password again. 
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
     

    // Now we have to update the requests on server
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { // finByIdAndUpdate is a mongoDB method use to set or update
            $set: req.body // This will take everything inside body and set it again. But this will not return your updated user, To prevent this we use {new: true} 
        }, { new: true }
        );
        // To send update user
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});



// DELETE USER
router.delete("/:id", verifyTokenAndAutharization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});



// GET USER 
// Only admin can see how many users are there.
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // We want to send user details to the admin but not the password of the users, So to prevent this, We use pread operator with others
        const { password, ...others } = user._doc;

        res.status(200).json(others)

    } catch (err) {
        res.status(500).json(err);
    }
});



// GET ALL USERS 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;