const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Set up multer storage for storing uploaded profile images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})



router.get(`/:id`, async (req, res) => {
    const userList = await User.findById(req.params.id);
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

router.post(`/`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2,
    })
    user = await user.save();
    if (!user)
        return res.status(500).send('The product cannot be created')

    res.send(user);
})



router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() })
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                useremail: user.email,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send('password is wrong!');
    }


})



router.put('/:id', async (req, res) => {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            city: req.body.city,
            aadhaarNumber: req.body.aadhaarNumber,

        },
        { new: true }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
})

// PUT route to upload/update a user's profile picture
router.put('/upload_profile_pic/:id', upload.single('image'), async (req, res) => {
    try {
        const userId = req.params.id;
        const profilePic = req.file ? req.file.path : undefined;

        if (!profilePic) {
            return res.status(400).json({ success: false, message: 'No image provided' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { profilePic: profilePic } },
            { new: true }
        ).select('-passwordHash');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Profile picture updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/reset_password', async (req, res) => {
    const { question1, question2, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if security questions match
        if (user.question1 !== question1 || user.question2 !== question2) {
            return res.status(400).json({ error: 'Security questions do not match' });
        }
        // Hash the new password

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update the user's password
        user.passwordHash = hashedPassword;

        // Save the updated user
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
        //res.send(user);


    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;