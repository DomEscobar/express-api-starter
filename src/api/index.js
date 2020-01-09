const express = require('express');

const amazon = require('./amazon');
const proxyList = require('./proxyList');

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    message: 'Ok 👋'
  });
});

router.use('/amazon', amazon);
router.use('/proxy', proxyList);

module.exports = router;
