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

  describe("GET /api/v1/foods", () => {
    it('returns all foods in the database', (done) => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(5);
        expect(res.body[0].name).to.eq("Pulled Pork");
        expect(res.body[0].calories).to.eq(700);
        // expect(res.body[1].name).to.eq("Baked Beans");
        // expect(res.body[1].calories).to.eq(300);
        // expect(res.body[2].name).to.eq("Potato");
        // expect(res.body[2].calories).to.eq(400);
        // expect(res.body[3].name).to.eq("Apple");
        // expect(res.body[3].calories).to.eq(80);
        // expect(res.body[4].name).to.eq("Salad");
        // expect(res.body[4].calories).to.eq(250);
        done();
      })
    })
  })

  describe("GET /api/v1/foods/:id", () => {
    it('returns food corresponding to :id', (done) => {
      chai.request(app)
      .get('/api/v1/foods/1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.eq("Pulled Pork");
        done();
      })
    })

    it('returns 404 if there is no record', (done) => {
      chai.request(app)
      .get('/api/v1/foods/100')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  })


});
