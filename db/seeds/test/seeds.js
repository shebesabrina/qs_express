exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Pulled Pork", 700]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Baked Beans", 300]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Potato", 400]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Apple", 80]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Salad", 250])
      ])
    })
  }
