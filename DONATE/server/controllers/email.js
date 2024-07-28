// utils/emailTemplates.js
function getDonationConfirmationEmail(user, donation) {
    return {
        to: user.email,
        from: 'no-reply@yourapp.com',
        subject: 'Donation Confirmation',
        text: `Dear ${user.firstName},\n\nThank you for your donation of $${donation.amount} to ${donation.Charity.name}.\n\nBest regards,\nYour App Team`,
        html: `<p>Dear ${user.firstName},</p>
               <p>Thank you for your donation of $${donation.amount} to ${donation.Charity.name}.</p>
               <p>Best regards,<br>Your App Team</p>`
    };
}

module.exports = { getDonationConfirmationEmail };
