const { Advocate } = require('../models/advocate');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const advocateList = await Advocate.find().select('-passwordHash');
    if (!advocateList) {
        res.status(500).json({ success: false })
    }
    res.send(advocateList);
})


router.post(`/`, async (req, res) => {
    let advocate = new Advocate({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        city: req.body.city,
        question1: req.body.question1,
        question2: req.body.question2
    })
    advocate = await advocate.save();
    if (!advocate)
        return res.status(500).send('The advocate cannot be created')

    res.send(advocate);
})



router.post('/login', async (req, res) => {
    const advocate = await Advocate.findOne({ email: req.body.email.toLowerCase() })
    const secret = process.env.secret;
    if (!advocate) {
        return res.status(400).send('The advocate not found');
    }

    if (advocate && bcrypt.compareSync(req.body.password, advocate.passwordHash)) {
        const token = jwt.sign(
            {
                advocateemail: advocate.email,
                isAdmin: advocate.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ advocate: advocate.email, token: token })
    } else {
        res.status(400).send('password is wrong!');
    }


})



router.post('/reset_password', async (req, res) => {
    const { question1, question2, newPassword } = req.body;

    try {
        // Find the advocate by email
        const advocate = await Advocate.findOne({ email: req.body.email });

        // Check if the advocate exists
        if (!advocate) {
            return res.status(404).json({ error: 'advocate not found' });
        }
        // Check if security questions match
        if (advocate.question1 !== question1 || advocate.question2 !== question2) {
            return res.status(400).json({ error: 'Security questions do not match' });
        }
        // Hash the new password

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update the advocate's password
        advocate.passwordHash = hashedPassword;

        // Save the updated advocate
        await advocate.save();
        res.status(200).json({ message: 'Password reset successful' });
        //res.send(advocate);


    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;