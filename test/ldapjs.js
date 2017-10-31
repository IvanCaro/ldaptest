/* eslint-env node, mocha */
require('dotenv').config({
  path: 'env.env'
});

const {
    assert
  } = require('chai');
const ldap = require('../helpers/ldap');

  // const userName = "jtorresr@minvu.cl";
  // const password = 'lagash.2017';

const userName = 'e_15617277-4@minvuext.cl';
const password = 'password.1';

let authResult;
before(done => {
  ldap
    .authenticate(userName, password)
      .then(result => {
        assert.isNotNull(result);
        authResult = result;
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
});

describe.only('Autenticando usuario con active directory (ldap)', () => {
  it('Usuario autenticado', () => {
    assert.isNotNull(authResult);
  });
});

let domainUser;
before(done => {
  ldap
    .extractDomainAndUserName(userName)
      .then(result => {
        assert.isNotNull(result);
        domainUser = result;
        done();
      })
    .catch(err => {
      done(err);
    });
});
