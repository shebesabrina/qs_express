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

  describe("PATCH /api/v1/foods/:id", () => {
    it('updates the food object', (done) => {
      chai.request(app)
      .patch('/api/v1/foods/1')
      .send({ "food": { "name": "updated", "calories": 1000} })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.eq("updated");
        expect(res.body.calories).to.eq(1000);
        done();
      })
    })

    it('returns a 400 if it is not updated successfully', (done) => {
      chai.request(app)
      .patch('/api/v1/foods/1')
      .send({ "food": {  "name": "wrong-o"} })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      })
    })
  })

  describe("DELETE /api/v1/foods/:id", () => {
    it('deletes food object', (done) => {
      chai.request(app)
      .delete('/api/v1/foods/1')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      })
    })

    it('returns a 404 when trying to delete a food that does not exist', (done) => {
      chai.request(app)
      .delete('/api/v1/foods/1')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      })
    })
  })
  })
