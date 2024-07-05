const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../../model/user');
const ForgotPassword = require('../../model/forgotPassword');

// POST /reset-password/:token - Reset user password
router.get('/:token', async (req, res) => {
    try {
       const  token  = req.params.token;
      //  const { newPassword } = req.body.uid;

       // console.log('logging new password>>>');

        // Find reset token in database
        const resetRecord = await ForgotPassword.findOne({
            where: {
                Id: token.substring(1),
            }
        });

        console.log(resetRecord);

        if (!resetRecord) {
            return res.status(400).json({ message: 'Invalid or expired Link' });
        }
        //displaying form to submit password

        res.status(200).send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>

        <form action="http://52.90.248.71:3000/user/updatePassword/${token}" method="post">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
    </html>`
    )
res.end()

console.log('reched till send form');

        }

/** 
async function updatePass()
{
        // Find user by userId
        const user = await User.findByPk(resetRecord.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Delete the used reset token from database
        await resetRecord.destroy();

        res.status(200).json({ message: 'Password updated successfully' });
    } 


}**/
        
    catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});


router.post('/:token', async (req, res) => {

console.log('IN UPDATE PASSWORD BLOC >>>> \n');
    const token = req.params.token;
    const { newpassword } = req.body;

    try {
        // Find reset token in database
        const resetRecord = await ForgotPassword.findOne({
            where: {
                Id: token.substring(1),
            }
        });

        if (!resetRecord) {
            return res.status(400).json({ message: 'Invalid or expired Link' });
        }

        // Find user by userId
        const user = await User.findByPk(resetRecord.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Delete the used reset token from database
        await resetRecord.destroy();

        res.status(200).send( `<html>
            <h3>Password Updated Success</h3>
        </html>` );
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router
