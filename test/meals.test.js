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
describe('Meal endpoints', function() {
  beforeEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  describe("GET /api/v1/meals", () => {
    it('returns all meals in the database', (done) => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.eql(4);
        expect(res.body[0].name).to.eq("Breakfast");
        expect(res.body[1].name).to.eq("Snack");
        expect(res.body[2].name).to.eq("Lunch");
        expect(res.body[3].name).to.eq("Dinner");
        done();
      })
    })
  })
  // 
  // describe("GET /api/v1/foods/:id", () => {
  //   it('returns food corresponding to :id', (done) => {
  //     chai.request(app)
  //     .get('/api/v1/foods/1')
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.body.name).to.eq("Pulled Pork");
  //       done();
  //     })
  //   })
  //
  //   it('returns 404 if there is no record', (done) => {
  //     chai.request(app)
  //     .get('/api/v1/foods/100')
  //     .end((err, res) => {
  //       expect(res).to.have.status(404);
  //       done();
  //     })
  //   })
  // })


});
