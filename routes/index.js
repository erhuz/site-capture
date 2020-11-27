
const express = require('express');
const asyncHandler = require('express-async-handler')
const puppeteer = require('puppeteer');
const fs = require('fs')
const router = express.Router();
const capture = require('../helpers/screenshot');

/* GET home page. */
router.get('/', handleGet);

/* POST request for image capture */
router.post('/', asyncHandler(handlePost));

function handleGet(req, res) {
  res.render('index', {
    title: 'The ultimate screenshot tool for websites!',
    devices: puppeteer.devices,
  });
}

async function handlePost(req, res) {
  console.log(req.body);
  try {
    let filePath = await capture(req.body.url, req.body.device);
    console.log(filePath);
    res.download(filePath);
    
    setTimeout(() => {
      fs.unlink(filePath);
    }, 1000 * 60 * 15);

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
  
}

module.exports = router;