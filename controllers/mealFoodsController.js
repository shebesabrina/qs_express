const MealFood = require('../models/mealFood')

class MealFoodsController {
  static create(request, response, next){
    MealFood.create(request.params)
    .then(mealFood => {
      if(mealFood){
        eval(pry.it)
        let result = mealFood.rows[0]
        let message = `Successfully added ${result.food_name} to ${result.meal_name}`
        response.status(201).json({message: message})
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = MealFoodsController
