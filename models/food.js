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

  static find(id) {
    return database('foods').where('id', id).select('id', 'name', 'calories')
    .then(rows => rows[0])
  }

  static update(id, attrs) {
    return database('foods').where('id', id)
    .update(attrs)
    .returning(['id', 'name', 'calories'])
    .then(rows => rows[0])
  }

  static destroy(id) {
    return database('foods').where('id', id).del()
  }
}

module.exports = Food
