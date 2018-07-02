const MealFood = require('../models/mealFood')

class MealFoodsController {
  static create(request, response, next){
    MealFoods.create(request.params)
    .then(mealFood => {
      if(mealFood){
        let message = `Successfully added ${mealFood.foodName} to ${mealFood.mealName}`
        response.status(201).json({message: message})
      } else {
        response.sendStatus(404)
      }
    })
  }
}

module.exports = MealFoodsController
