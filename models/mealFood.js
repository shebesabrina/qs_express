const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

class MealFood {

  static favorite(){
    return database.raw(`SELECT DISTINCT(sub.timesEaten) as timesEaten, array_agg(jsonb_build_object('name', foods.name, 'calories', foods.calories, 'mealWhenEaten', sub.meals)) as foods
                  FROM (SELECT DISTINCT COUNT(food_id) as timesEaten, food_id, array_agg(DISTINCT(meals.name)) as meals FROM meal_foods, meals WHERE meals.id = meal_foods.meal_id GROUP BY meal_foods.food_id) sub, foods
                  WHERE foods.id = sub.food_id
                  GROUP BY sub.timeseaten
                  ORDER BY sub.timeseaten DESC;`)
  }

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
