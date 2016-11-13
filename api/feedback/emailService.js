// Includes
let extend = require('util')._extend;
let nodemailer = require('nodemailer');
let sendmailTransport = require('nodemailer-smtp-transport');

// Constants
let DEFAULTS = {
  from: '"Example Name" <name@example.com>',
  to: '"Other Example" <other@example.com>',
  subject: '',
  text: ''
};

// Constructors
function EmailService(parameters) {
  this.mailOptions = _copy(DEFAULTS);

  if (!_isUndefined(parameters)) {
    this.mailOptions.subject = _buildSubjectString(parameters.useful, parameters.item);
    this.mailOptions.text = _buildBodyString(parameters.feedback, parameters.item, parameters.url, parameters.emailAddr,
      parameters.userName);
  }
}

EmailService.prototype.executeMailSend = function(callback) {
  let transporter = nodemailer.createTransport(sendmailTransport({
    host: 'mail.example.com'
  }));

  transporter.sendMail(this.mailOptions, (error, info) => {
    if (error) {
      callback(error);
    }
    callback(null, info);
  });
};

// Private Functions
function _buildSubjectString(useful, item) {
  return 'The customer found the item ' + item + ' ' + (useful === 'yes' ? 'useful.' : 'NOT useful!');
}

function _buildBodyString(feedback, item, url, emailAddr, userName) {
  let feedbackStr = !_isUndefined(feedback) ? 'Customer comments: ' + feedback + '\n' : '';
  let date = new Date();
  let emailStr = !_isUndefined(emailAddr) ? 'Customer email address: ' + emailAddr + '\n' : '';
  let userStr = !_isUndefined(userName) ? "Customer username: " + userName + '\n' : '';

  return feedbackStr +
    'Item: ' + item + '\n' +
    'Page URL: ' + url + '\n' +
    'Date: ' + date + '\n' +
    emailStr +
    userStr;
}

function _isUndefined(obj) {
  return typeof obj === 'undefined' || obj === null;
}

function _copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Module
module.exports = EmailService;
