require('dotenv').config({
  path: 'env.env'
});

const ldap = require('./helpers/ldap');
//const userName = 'e_15617277-4@minvuext.cl';
//const password = 'password.1';

const userName = 'icarof@minvu.cl';
const password = 'Res.8020';

ldap
.authenticate(userName, password)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
