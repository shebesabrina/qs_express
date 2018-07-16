const MealFood = require('../models/mealFood')
const Meal = require('../models/meal')
const Food = require('../models/food')

class MealFoodsController {
  static create(request, response, next){
    if(Meal.find(request.params.meal_id) && Food.find(request.params.food_id)) {
      MealFood.create(request.params)
        .then(mealFood => {
          if(mealFood){
            let result = mealFood.rows[0]
            let message = `Successfully added ${result.food_name} to ${result.meal_name}`
            response.status(201).json({message: message})
          } else {
            response.sendStatus(404)
          }
        })
    } else {
      response.sendStatus(404)
    }
  }

  static destroy(request, response, next) {
    MealFood.destroy(request.params)
      .then((mealFood) => {
        if(mealFood) {
          let result = mealFood.rows[0]
          let message = `Successfully removed ${result.food_name} from ${result.meal_name}`
          response.json({message: message})
        } else {
          response.sendStatus(404)
        }
      })
  }
}

module.exports = MealFoodsController
