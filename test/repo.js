/* eslint-env node, mocha */
require('dotenv').config({
  path: 'env.env'
});

const {
      assert
    } = require('chai');

const repo = require('../helpers/repo');

before(function (done) {
  this.timeout(10000);
  repo.connect(done);
});

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

describe.only('Obteniendo datos de la Base de datos', () => {
  it('data', () => {
    assert.isNotNull(result);
    console.log(result);
  });
});

