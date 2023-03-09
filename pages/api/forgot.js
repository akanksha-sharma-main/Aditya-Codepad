import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let email = await User.findOne({ email: req.body.email })
        if (email) {
            res.status(200).json({resetId: true, message: "Your reset link is succesfully send to your email"})
        } else {
            res.status(200).json({ success: false, error: "Email not found" })
        }
    }
    else {
        res.status(400).json({ error: " This Method is not allowed! " })
    }
}
export default connectDb(handler)
