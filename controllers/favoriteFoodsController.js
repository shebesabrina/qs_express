pry = require('pryjs');
const Food = require('../models/food')
const MealFood = require('../models/mealFood')

class FavoriteFoodsController {
  static index(request, response, next){
    MealFood.favorite()
    .then(function(favorites) {
        if(!favorites.rows) {
          return response.sendStatus(404)
        } else {
          return response.json(favorites.rows)
        }
      })
  }

}

module.exports = FavoriteFoodsController
