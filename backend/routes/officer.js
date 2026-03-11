const { Officer } = require('../models/officer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Set up multer storage for storing uploaded profile images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Specify the directory where you want to store the images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    const officerList = await Officer.find().select('-passwordHash');
    if (!officerList) {
        res.status(500).json({ success: false })
    }
    res.send(officerList);
})

router.get(`/:id`, async (req, res) => {
    const officerList = await Officer.findById(req.params.id);

    if (!officerList) {
        res.status(500).json({ success: false })
    }
    res.send(officerList);
})


router.post(`/`, upload.single('image'), async (req, res) => {
    let officer = new Officer({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        mobile: req.body.mobile,
        location: req.body.location,
        city: req.body.city,
        // Official fields
        officerId: req.body.officerId,
        department: req.body.department,
        designation: req.body.designation,
        policeStation: req.body.policeStation,
        district: req.body.district,
        state: req.body.state,
        experience: req.body.experience,
        officeContact: req.body.officeContact,
        joiningDate: req.body.joiningDate,
        address: req.body.address,
        image: req.file ? `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}` : '',
    })
    officer = await officer.save();
    if (!officer)
        return res.status(500).send('The officer cannot be created')

    res.send(officer);
})



router.post('/login', async (req, res) => {
    const officer = await Officer.findOne({ email: req.body.email.toLowerCase() })
    const secret = process.env.secret;
    if (!officer) {
        return res.status(400).send('The officer not found');
    }

    if (officer && bcrypt.compareSync(req.body.password, officer.passwordHash)) {
        const token = jwt.sign(
            {
                officeremail: officer.email
            },
            secret,
            { expiresIn: '1d' }
        )


        // Set cookies for location and department
        res.cookie('location', officer.location, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        //   res.cookie('department', officer.department, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });


        res.status(200).send({
            officer: officer.email,
            officerLocation: officer.location,
            // officerDepartment: officer.department,
            token: token
        })
    } else {
        res.status(400).send('password is wrong!');
    }


})

router.put('/:id', upload.single('image'), async (req, res) => {

    const officerExist = await Officer.findById(req.params.id);
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = officerExist.passwordHash;
    }

    let imagePath = officerExist.image;
    if (req.file) {
        imagePath = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
    }

    const officer = await Officer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            mobile: req.body.mobile,
            location: req.body.location,
            city: req.body.city,
            officerId: req.body.officerId,
            department: req.body.department,
            designation: req.body.designation,
            policeStation: req.body.policeStation,
            district: req.body.district,
            state: req.body.state,
            experience: req.body.experience,
            officeContact: req.body.officeContact,
            joiningDate: req.body.joiningDate,
            address: req.body.address,
            image: imagePath
        },
        { new: true }
    )

    if (!officer)
        return res.status(400).send('the officer cannot be updated!')

    res.send(officer);
})

router.delete('/:id', async (req, res) => {
    try {
        const officer = await Officer.findByIdAndRemove(req.params.id);
        if (!officer) {
            return res.status(404).send('Officer not found');
        }
        res.send('Officer removed successfully');
    } catch (error) {
        console.error('Error removing officer:', error.message);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;