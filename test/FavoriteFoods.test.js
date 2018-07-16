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

  describe("GET /api/v1/favorite_foods", () => {
    it('returns foods added to more than one meal', (done) => {
      chai.request(app)
      .get('/api/v1/favorite_foods')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        eval(pry.it)
        expect(res.body.timesEaten).to.eql(2);
        expect(res.body.foods.length).to.eq(2);
        expect(res.body.foods[0].name).to.eq("Banana");
        expect(res.body.foods[1].name).to.eq("Meatloaf");
        done();
      })
    })
  })



});
