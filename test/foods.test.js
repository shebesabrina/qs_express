const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')
const seed = require('../db/seeds/test/seeds')


chai.use(chaiHttp);
//
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)

/* Clean database and run migrations/seeds before each test*/
describe('Food endpoints', function() {
  beforeEach(function(done) {
    knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE'),
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  afterEach(function(done) {
    knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE'),
    knex.seed.run()
      .then(function() {
        done();
      });
    });
  });

  describe("GET /api/v1/foods", () => {
  it('returns all foods in the database', (done) => {
    chai.request(app)
    .get('/api/v1/foods')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.length).to.eql(4);
      expect(res.body[0].name).to.eq("Pulled Pork");
      expect(res.body[0].calories).to.eq(700);
      expect(res.body[1].name).to.eq("Baked Beans");
      expect(res.body[1].calories).to.eq(300);
      expect(res.body[2].name).to.eq("Potato");
      expect(res.body[2].calories).to.eq(400);
      expect(res.body[3].name).to.eq("Apple");
      expect(res.body[3].calories).to.eq(80);
      expect(res.body[4].name).to.eq("Salad");
      expect(res.body[4].calories).to.eq(250);
      done();
    })
  })
})
