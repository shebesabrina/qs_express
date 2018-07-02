const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

class MealFood {
  static create(attributes){
    return database('meal_foods')
    .insert({meal_id: attributes.meal_id, food_id: attributes.id})
    .returning(this.message(attributes))
  }

  static message(attributes) {
    return database('meal_foods')
    .select({mealName: 'meals.name'}, {foodName: 'foods.name'})
    .where({meal_id: attributes.meal_id, food_id: attributes.id})
    .join('meals', {'meals.id': 'meal_foods.meal_id'})
    .join('foods', {'foods.id': 'meal_foods.food_id'})
    .first()
  }
}

module.exports = MealFood
