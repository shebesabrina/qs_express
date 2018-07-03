const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

class MealFood {
  static create(attributes){
    let meal_id = attributes.meal_id
    let food_id = attributes.food_id
    return database('meal_foods')
    .insert({meal_id: meal_id, food_id: food_id})
    .then(() => {
      return database.raw(`SELECT meals.name AS meal_name, foods.name AS food_name
                   FROM meals
                   INNER JOIN meal_foods mf ON meals.id = mf.meal_id
                   INNER JOIN foods ON foods.id = mf.food_id
                   WHERE meals.id=? AND foods.id=?`, [meal_id, food_id])
    })
  }

  static destroy(attributes) {
    let meal_id = attributes.meal_id
    let food_id = attributes.food_id
    return database('meal_foods').where(attributes).del()
    .then(() => {
      return database.raw(`SELECT meals.name AS meal_name, foods.name AS food_name
                           FROM meals, foods
                           WHERE meals.id=? AND foods.id=?`, [meal_id, food_id])
    })
  }
}

module.exports = MealFood
