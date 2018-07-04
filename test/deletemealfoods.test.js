process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')

chai.use(chaiHttp);
//
const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

/* Clean database and run migrations/seeds before each test*/
describe('Food endpoints', function() {
  beforeEach((done) => {
    knex.migrate.latest()
    .then(() => {
      knex.seed.run()
      .then(() => {
        done();
      })
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe("DELETE /api/v1/meals/:id/foods/:id", () => {
    it('deletes the food meal combo', (done) => {
      chai.request(app)
      .delete('/api/v1/meals/2/foods/1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.eq("Successfully removed Pulled Pork from Snack");
        done();
      })
    })

    it('returns a 404 if it is not updated successfully', (done) => {
      chai.request(app)
      .patch('/api/v1/meals/200/foods/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  })
  })
