const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/mealsController')
const MealFoodsController = require('../../../controllers/mealFoodsController')

router.get('/', MealsController.index)
router.post('/:meal_id/foods/:food_id', MealFoodsController.create)
router.get('/:meal_id/foods', MealsController.show)


module.exports = router;
