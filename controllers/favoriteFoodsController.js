pry = require('pryjs');
const Food = require('../models/food')
const MealFood = require('../models/mealFood')

class FavoriteFoodsController {
  static index(request, response, next){
    MealFood.favorite()
    .then(foods => response.json(foods))
  }

}

module.exports = FavoriteFoodsController
