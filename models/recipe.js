const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Recipe {
  static all(food_id) {
    
  }

}

module.exports = Recipe
