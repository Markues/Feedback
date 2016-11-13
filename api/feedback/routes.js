let EmailService = require('./emailService');

module.exports = function(api) {
  // Serve requests to /api/feedback
  api.route('/api/feedback')
    .get(function(req, res) {
      // Create new Email Service object
      let emailService = new EmailService(req.query);
      // Execute the Mail send
      emailService.executeMailSend(handleResp);

      // Function to handle our mail response data
      function handleResp(err, data) {
        if (err) {
          // Log any errors
          console.log(err);
        }
        // Log the mail response
        console.log('Message sent: ' + data.response);
        res.send('Feedback sent!');
      }
    });
};
