require('dotenv').config({
  path: 'env.env'
});

const ldap = require('./helpers/ldap');
const userName = 'e_15617277-4@minvuext.cl';
const password = 'password.1';

ldap
.authenticate(userName, password)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
