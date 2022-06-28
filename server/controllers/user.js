const User = require('../models/User');
const { validateEmail, validateLength, validateUsername } = require('../helpers/validation')
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens');


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

        const encryptedPassword = await bcrypt.hash(password, 12);
        let temporaryUsername = first_name + last_name;
        let newUsername = await validateUsername(temporaryUsername);


        const user = await new User({
            first_name,
            last_name,
            username: newUsername,
            email,
            password: encryptedPassword,
            bYear,
            bMonth,
            bDay,
            gender,
        }).save();
        const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m");
        res.json(user);
        console.log(emailVerificationToken);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} 