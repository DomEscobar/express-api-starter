const express = require('express');

const amazon = require('./amazon');
const proxyList = require('./proxyList');
const youtube = require('./youtube');

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    message: 'Ok 👋'
  });
});

router.use('/youtube', youtube);
router.use('/amazon', amazon);
router.use('/proxy', proxyList);

module.exports = router;
