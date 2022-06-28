const User = require('../models/User');
const { validateEmail, validateLength } = require('../helpers/validation')
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            username,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,

        } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        if (!validateLength(first_name, 2, 20)) {
            return res.status(400).json({
                message: "First name must be between 2 and 20 characters"
            })
        }

        if (!validateLength(last_name, 2, 20)) {
            return res.status(400).json({
                message: "Last name must be between 2 and 20 characters"
            })
        }

        if (!validateLength(password, 8, 40)) {
            return res.status(400).json({
                message: "Password must be between 8 and 4  0 characters"
            })
        }


        const user = await new User({
            first_name,
            last_name,
            username,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} 