pry = require('pryjs');
const Food = require('../models/food')

class FavoriteFoodsController {
  static index(request, response, next){
    Food.all()
    .then(foods => response.json(foods))
  }


}

module.exports = FavoriteFoodsController
