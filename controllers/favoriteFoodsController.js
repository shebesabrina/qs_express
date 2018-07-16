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
            var max = favorites.rows[0].timeseaten
            var response_array = []
            for(var i=max; i > 0; i--){
              var foods = favorites.rows.filter(row => row.timeseaten == i)
              if(foods.length > 0) {
              response_array.push({
                  "timesEaten": i,
                  "foods": foods
                  })
                }
            }
            return response.json(response_array)
        }
      })
  }

}

module.exports = FavoriteFoodsController
