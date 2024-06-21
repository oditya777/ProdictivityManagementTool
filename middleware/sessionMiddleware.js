const session = require('express-session');

module.exports = session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use secure: true if using HTTPS
});
