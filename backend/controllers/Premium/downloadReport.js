const AWS = require('aws-sdk');
const key = require('../../util/keys');
const Expense = require('../../model/expense');
const auth = require('../../middleware/auth');

const express = require('express');
const router = express.Router();

// Configure AWS credentials
AWS.config.update({
    accessKeyId: key.aws_key,
    secretAccessKey: key.aws_secret_key,
});

// Create S3 instance
const s3 = new AWS.S3();

router.get('/', auth, async (req, res) => {
    try {
        // Fetch expenses for the authenticated user
        const expenses = await Expense.find({ userId: req.user.userId }).exec();

        if (expenses.length > 0) {
            const params = {
                Bucket: 'bucketshrey1',
                Key: `Expense/${req.user.userId}/${new Date().toISOString()}.txt`, // File name in S3
                Body: JSON.stringify(expenses),
                ContentType: 'application/json' // Optional: Set content type for better handling in S3
            };

            try {
                // Upload the data to S3
                const data = await s3.upload(params).promise();
                console.log('Data Upload success:', data);
                res.status(200).json({ message: "File uploaded successfully", url: data.Location });
            } catch (uploadError) {
                console.error('S3 Upload Error:', uploadError);
                res.status(500).json({ message: "Error uploading file to S3" });
            }
        } else {
            res.status(404).json({ message: "No expenses found for the user" });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
