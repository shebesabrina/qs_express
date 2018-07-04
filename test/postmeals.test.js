process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')
const Food = require('../models/food')

chai.use(chaiHttp);
//
const environment = 'test'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)


/* Clean database and run migrations/seeds before each test*/
describe('Meal endpoints', function() {
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
describe("POST /api/v1/meals/1/foods/1", () => {
  it('creates a new meal and foods relationship', (done) => {
    chai.request(app)
    .post('/api/v1/meals/1/foods/1')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body.message).to.eq("Successfully added Pulled Pork to Breakfast");
      done();
    })
  })
  // it('returns 404 if meal or foods does not exist', (done) => {
  //   chai.request(app)
  //   .post('/api/v1/meals/100/foods/100')
  //   .end((err, res) => {
  //     expect(err).to.be.null;
  //     expect(res).to.have.status(404);
  //     done();
  //   })
  // })
})

})
