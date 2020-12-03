/**
 *
 * This will contain routes related to the home page etc
 *
 * */

const express = require('express');
const router = express.Router();

router.get('./', (req, res) => res.render('Welcome'));


module.exports = router