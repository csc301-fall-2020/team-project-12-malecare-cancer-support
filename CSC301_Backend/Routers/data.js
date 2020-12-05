const express = require('express');
const router = express.Router();
const CancerData = require("./cancer_data");
const InterestsData = require("./interests");

router.get('/cancer-data', async (req, res) => {
    
    return res.status(200).json(CancerData);
 
});

router.get('/interests', async (req, res) => {
    
    return res.status(200).json(InterestsData);
 
});


module.exports = router;

