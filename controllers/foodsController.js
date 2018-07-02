pry = require('pryjs');
const Food = require('../models/food')

class FoodsController {
  static index(request, response, next){
    Food.all()
    .then(foods => response.json(foods))
  }

  static create(request, response, next){
    let foodParams = request.body.food
    if(foodParams.calories && foodParams.name) {
      Food.create(foodParams)
      .then(food => response.status(201).json(food))
    }
    else {
      response.sendStatus(400)
    }
  }
}

module.exports = FoodsController
