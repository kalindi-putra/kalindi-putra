const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/contact_us', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact_us.html'));
});
router.post('/contact_us',(req,res,next)=>{
    res.redirect('/');
})

module.exports = router;
