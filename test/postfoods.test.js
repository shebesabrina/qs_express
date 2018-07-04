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
  beforeEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });
describe("POST /api/v1/foods", () => {
  it('creates a new food object in the database', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "name": "veggies", "calories": 25} })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body.name).to.eq("veggies");
      expect(res.body.calories).to.eq(25);
      // expect(knex('foods').select('id', 'name', 'calories').to.eq(6);
      done();
    })
  })

  it('does not create record if name missing', (done) => {
    chai.request(app)
    .post('/api/v1/foods')
    .send({ "food": { "calories": 1} })
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    })
  })
})

// describe("PATCH /api/v1/foods/:id", () => {
//   it('updates food object corresponding to :id', (done) => {
//     chai.request(app)
//     .patch('/api/v1/foods/1')
//     .send({ "food": { "name": "orange", "calories": 900} })
//     .end((err, res) => {
//       expect(err).to.be.null;
//       expect(res).to.have.status(200);
//       expect(res.body.name).to.eq("orange");
//       expect(res.body.calories).to.eq(900);
//       done();
//     })
//   })
//
//   it('returns a 404 if name is missing', (done) => {
//     chai.request(app)
//     .patch('/api/v1/foods/1')
//     .send({ "food": {  "calories": 900} })
//     .end((err, res) => {
//       expect(res).to.have.status(404);
//       done();
//     })
//   })
//
//   it('returns a 404 if calories is missing', (done) => {
//     chai.request(app)
//     .patch('/api/v1/foods/1')
//     .send({ "food": {  "name": "orange"} })
//     .end((err, res) => {
//       expect(res).to.have.status(404);
//       done();
//     })
//   })
//
//   it('returns a 404 if record does not exist', (done) => {
//     chai.request(app)
//     .patch('/api/v1/foods/99')
//     .send({ "food": {  "name": "orange", "calories": 100 } })
//     .end((err, res) => {
//       expect(res).to.have.status(404);
//       done();
//     })
//   })
// })
//
// describe("DELETE /api/v1/foods/:id", () => {
//   it('deletes food object corresponding to :id', (done) => {
//     chai.request(app)
//     .delete('/api/v1/foods/1')
//     .end((err, res) => {
//       expect(res).to.have.status(204);
//       done();
//     })
//   })
//
//   it('returns a 404 when trying to delete nonexisting record', (done) => {
//     chai.request(app)
//     .delete('/api/v1/foods/1')
//     .end((err, res) => {
//       expect(res).to.have.status(204);
//       done();
//     })
//   })
// })
})
