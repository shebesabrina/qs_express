const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

class MealFood {
  static create(attributes){
    return database('meal_foods')
    .insert(attributes)
    .returning(this.message(attributes))
  }

  static message(attributes) {
    let food_id = attributes.id
    let meal_id = attributes.meal_id
    return database.raw(
      "SELECT foods.name AS food_name, meals.name AS meal_name FROM meal_foods INNER JOIN meals on meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id WHERE meal_foods.meal_id = ? AND meal_foods.food_id = ?;",
      [meal_id, food_id]
    )
    .then((data) => {
      eval(pry.it)
      f_name = data.rows[0].food_name
      m_name = data.rows[0].meal_name
      return {food_name: f_name, meal_name: m_name}
    })
  };
}

module.exports = MealFood
