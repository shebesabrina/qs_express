const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {
  static create(attributes){
    return database('meal_foods')
    .insert(attributes)
    .returning(this.message(attributes))
  }
}

module.exports = MealFood
