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

  describe("GET /api/v1/foods/:id/recipes", () => {
    it('shows recipes associated with a food', (done) => {
      chai.request(app)
      .get('/api/v1/foods/2/recipes')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        eval(pry.it)
        expect(res.body.recipes.length).to.eql(10);
        expect(res.body.recipes.first.name).to.eq("something");
        expect(res.body.recipes.first.url).to.eq("something");
        done();
      })
    })
  })



});
