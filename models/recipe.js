require('isomorphic-fetch');
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)


fetch('http://api.yummly.com/v1/api/recipes?_app_id=2e2c0a2e&_app_key=083edf3221f3c68df434cef4487c8df9y&q=banana')
.then((response) => console.log(response))

class Recipe {
  static all(food_id) {
    const allRecipes = () => {
      fetch('http://api.yummly.com/v1/api/recipes?_app_id=2e2c0a2e&_app_key=083edf3221f3c68df434cef4487c8df9y&q=banana')
      .then((response) => console.log(response))
      .catch((error) => console.error({ error }));
    }
  }

}

module.exports = Recipe
