const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as per your project structure
const secret = '123456789'; // Replace with your actual JWT secret

const auth = async (req, res, next) => {
  try {
    console.log('IN the Authorization' , req.header);

    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }

    // 2. Verify token
    console.log('Verfifying Token' , token);
    const decoded = jwt.verify(token, secret);

    console.log('Decoded value' , decoded.user.id);
    const email = decoded.user.id; // Assuming your JWT payload includes 'email'

    // 3. Find user by email in database
    const user = await User.findOne({ email });

    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // 4. Attach user object to request object
    console.log('returing User object');
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Authorization failed.', error: error.message });
  }
};

module.exports = auth;
