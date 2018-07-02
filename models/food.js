const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  static all() {
    return database('foods').select('id', 'name', 'calories')
  }

  static create(attributes){
  return database('foods')
  .insert(attributes)
  .returning(['id', 'name', 'calories'])
  .then(rows => rows[0])
}
}

module.exports = Food
