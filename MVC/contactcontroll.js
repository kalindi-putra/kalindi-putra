const path = require('path');
const rootDir = require('../util/path');

exports.getcontact=(req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'contact_us.html'));
  };
exports.postcontact=(req,res,next)=>{
    res.redirect('/');
};
