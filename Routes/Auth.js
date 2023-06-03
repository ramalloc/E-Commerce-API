// We will login and register inside this router, This is safer then nomal routes. 
// This is a good practice to make secure apps 

const router = require('express').Router();
const User = require('../Models/User');
const CryptoJS = require('crypto-js');

// After login process, we will provide them jwt
// We are using json Web Token to verify that the requests(user,product and cart(remove or add)) are belongs to the client or not
const jwt = require('jsonwebtoken');

// REGISTER ROUTE

router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(), // We are taking the password directly from the body, we must encrypt it then we should save this to the db. Here we are using Crypto Js

    });

    // To save the User details on our database we use SAVE
    // newUser.save();
    // But this take long time, So to make it faster we have to make the post function Asynchronous and await to the savedIser
    // Also we can get error so we should use try and catch
    try {
        const savedUser = await newUser.save();
        // We are sending this user to our client side
        res.status(201).json(savedUser); // 201 status for saved successfully
    } catch (err) {
        res.status(500).json(err); // 500 status is for error
    }



    //LOGIN

    router.post("/login", async (req, res) => {

        try {
            const user = await User.findOne({ username: req.body.username }); // We using User.js file here to match the username in the data base, and findOne user from the Users
            !user && res.status(401).json("Wrong Credentials");

            // Now here we need to decrypt the password, which is saved in database as (Hash Values). So we are using CrytpoJS
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            Originalpassword !== req.body.password && res.status(401).json("Wrong Credentials");

            const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
                {expiresIn: "3d"}
            );

            // There is a problem in login, we post hashed password also in user Details
            // So to hide the hash password of the user we will use spread Operator (...) 
            const { password, ...others } = user._doc; // This line of codes means that others with spread operator(...others) contains everything except password


            res.status(200).json({...others, accessToken});

        } catch (err) {
            res.status(500).json(err);
        }

    });

});

module.exports = router;