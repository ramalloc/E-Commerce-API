const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/Users');
const authRoute = require('./Routes/Auth');


const app = express();

dotenv.config();

// mongoose.connect(
//     "mongodb+srv://E-Kom:Omnamah8*@cluster0.nlv3lta.mongodb.net/E-CommerceNodeJs?retryWrites=true&w=majority" // This our secret key, if we share this then anybody can access our data and can see and make collections.
// // So to protect this key we use .env file
// ).then(() => console.log("Db Connection Successful !"))

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Db Connection Successful !"))
    .catch((err) => {
        console.log(err);
    });


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log("Backend Server is running !");
});