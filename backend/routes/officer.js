const {Officer} = require('../models/officer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const officerList = await Officer.find().select('-passwordHash');
    if(!officerList) {
        res.status(500).json({success: false})
    } 
    res.send(officerList);
})

router.get(`/:id`, async (req, res) =>{
    const officerList = await Officer.findById(req.params.id);

    if(!officerList) {
        res.status(500).json({success: false})
    } 
    res.send(officerList);
})


router.post(`/`, async (req, res) =>{
    let officer = new Officer({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        mobile: req.body.mobile,
        location: req.body.location,
        // department: req.body.department
        })
    officer = await officer.save();
    if(!officer) 
    return res.status(500).send('The officer cannot be created')

    res.send(officer);
})



router.post('/login', async (req,res) => {
    const officer = await Officer.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!officer) {
        return res.status(400).send('The officer not found');
    }

    if(officer && bcrypt.compareSync(req.body.password, officer.passwordHash)) {
        const token = jwt.sign(
            {
                officeremail: officer.email
            },
            secret,
            {expiresIn : '1d'}
        )
       
        
      // Set cookies for location and department
      res.cookie('location', officer.location, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    //   res.cookie('department', officer.department, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });


        res.status(200).send({officer: officer.email ,
            officerLocation: officer.location,
            // officerDepartment: officer.department,
            token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

router.put('/:id',async (req, res)=> {

    const officerExist = await Officer.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = officerExist.passwordHash;
    }

    const officer = await Officer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            mobile: req.body.mobile,
            location: req.body.location,
            // department: req.body.department
            
        },
        { new: true}
    )

    if(!officer)
    return res.status(400).send('the officer cannot be created!')

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


module.exports =router;