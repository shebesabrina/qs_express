const Meal = require('../models/meal')

class MealsController {
  static index(request, response, next){
    Meal.all()
    .then(meals => response.json(meals))
  }

  static show(request, response, next){
    Meal.find(request.params.meal_id)
    .then(meal => {
      eval(pry.it)
      if(meal) {
        Meal.foods(meal)
        .then(foods => response.json(foods))
      } else {
        response.sendStatus(404)
      }
    })
  }

  static foods(meal){
    return database('foods')
    .select('foods.id', 'foods.name', 'foods.calories')
    .join('meal_foods', {'foods.id': 'meal_foods.food_id'})
    .where('meal_foods.meal_id', meal.id)
    .then(foods => {
      meal.foods = foods
      return meal
    })
  }
}

module.exports = MealsController
