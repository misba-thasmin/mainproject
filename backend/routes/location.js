const {Location} = require('../models/location');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const path = require('path');


// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });






router.get(`/`,  async (req, res) =>{
    const locationList = await Location.find();

    if(!locationList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(locationList);
})



router.get(`/:id`, async (req, res) =>{
    const locationList = await Location.findById(req.params.id);

    if(!locationList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(locationList);
})


router.post('/', auth, async (req,res)=>{
    let location = new Location({
      
        adminemail: req.body.adminemail,
        location: req.body.location
        
       
    })
    location = await location.save();

    if(!location)
    return res.status(400).send('the location cannot be created!')
    res.send(location);
    
})


router.put('/:id',async (req, res)=> {
    const location = await Location.findByIdAndUpdate(
        req.params.id,
        {  
            adminemail: req.body.adminemail,
            location: req.body.location
        },
        { new: true}
    )

    if(!location)
    return res.status(400).send('the location cannot be updated!')

    res.send(location);
})



router.delete('/:id', auth, (req, res)=>{
    Location.findByIdAndRemove(req.params.id).then(location =>{
        if(location) {
            return res.status(200).json({success: true, message: 'the location is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "location not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})









{/*
router.put('/status/:id', auth, async (req, res)=> {
    const complaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status,
            reason: req.body.reason,
            remedies: req.body.remedies,
            notes: req.body.notes,
            
        },
        { new: true}
    )

    if(!complaint)
    return res.status(400).send('the status cannot be created!')

    res.send(complaint);
})
*/}


module.exports =router;