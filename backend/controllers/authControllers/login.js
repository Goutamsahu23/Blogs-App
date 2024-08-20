const bcrypt=require('bcryptjs');
const User=require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(499).json({
                success: false,
                message: "fill all the required fileds."
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password. or new user"
            });
        }
        const payload = {
            email: user.email,
            id: user._id
        }
        // verify password and generate jwt
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });


            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie('auth', token, options).status(200).json({
                success: true,
                token,
                user,
                message: `Welcome Back !! ${user.name}`
            });


        } else {
            res.status(403).json({
                success: false,
                message: "password incorrect."
            })
        }

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: "login failed",
            success: false,
        })

    }
}