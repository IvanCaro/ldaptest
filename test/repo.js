/* eslint-env node, mocha */
require('dotenv').config({
  path: 'env.env'
});

const {
      assert
    } = require('chai');

const repo = require('../helpers/repo');

let result;
before(done => {
  repo.getUserById(10)
        .then(data => {
          assert.isNotNull(data);
          result = data;
          done();
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
});

describe.only('Autenticando usuario con active directory (ldap)', () => {
  it('Usuario autenticado', () => {
    assert.isNotNull(result);
  });
});

