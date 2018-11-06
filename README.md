# Quantified Self Back-end Express

## Initial Setup

1. Clone this repository and rename the repository to `quantified-self-express` in one command

  ```shell
  git clone git@github.com:shebesabrina/quantified-self-express.git
  ```
2. Change into the `quantified-self-express` directory

3. Install the dependencies

  ```shell
  npm install
  ```

3. Set up the database in psql

  ```shell
  CREATE DATABASE quantified_self;
  CREATE DATABASE quantified_self_test;
  ```

4. Migrate and Seed in dev and test env
  ```shell
  knex migrate:latest
  knex seed:run
  knex migrate:latest --env test
  knex seed:run --env test
  ```

5. Run test suite

  ```shell
    npm test
  ```

## Running the Server Locally

To see your code in action locally, you need to fire up a development server. If you have nodemon `(npm install nodemon -g $ nodemon bin/www)`, use the command:

```shell
nodemon bin/www
```

Once the server is running, visit API endpoints in your browser:

* `http://localhost:3000/` to run your application.  Spec](https://github.com/turingschool/backend-curriculum-site/blob/gh-pages/module4/projects/quantified-self/quantified-self.md)

### Endpoints

* To see the [front end](https://github.com/shebesabrina/quantified-self-fe-express) deployed with this app, visit https://shebesabrina.github.io/quantified-self-fe-express/

Back End Production Base URL:  https://qs-express-mw.herokuapp.com
Local Base URL:       http://localhost:3000

#### Food Endpoints

**GET /api/v1/foods**
Return all foods in the database

Request URL
```
/api/v1/foods
```

Response Body
```
[
  {
    id: 1,
    name: "Banana",
    calories: 100
  },
  {
    id: 2,
    name: "Apple",
    calories: 200
  },
  {...}
]
```
Response Code
```
200
```


**GET /api/v1/foods/:id**
Return food corresponding to :id

Request URL
```
/api/v1/foods/:id
```

Response Body
```
{
  id: 1,
  name: "Banana",
  calories: 100
}
```

Response Code
```
200
```


**POST /api/v1/foods**
Create a new food item in the database

Request URL
```
/api/v1/foods
```

Parameters Format
_All parameters required_
```
{ food { "name": "Fried Chicken", "calories": 1000 } }
```

Response Body
```
{
  id: 1,
  name: "Fried Chicken",
  calories: 1000
}
```

Response Code
```
201
```


**PATCH /api/v1/foods/:id**
Edit food corresponding to :id

Request URL
```
/api/v1/foods/:id
```

Parameters Format
_All parameters required_
```
{ food { "name": "Banana", "calories": 150 } }
```

Response Body
```
{
  id: 1,
  name: "Banana",
  calories: 150
}
```

Response Code
```
200
```


**DELETE /api/v1/foods/:id**
Delete food corresponding to :id

Request URL
```
/api/v1/foods/:id
```

Response Code
```
204
```



##### Meal Endpoints

**GET /api/v1/meals**
Return all meals along with their associated foods

Request URL
```
/api/v1/meals
```

Response Body
```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Apple",
                "calories": 200
            }
        ]
    },
    {
        "id": 2,
        "name": "Lunch",
        "foods": [
            {
                "id": 5,
                "name": "Sandwich",
                "calories": 800
            },
            {
                "id": 9,
                "name": "Fries",
                "calories": 400
            }
        ]
    },
    {...}
  ]
```

Response Code
```
200
```


**GET /api/v1/meals/:meal_id/foods**
Return all foods associated with meal corresponding to :meal_id

Request URL
```
/api/v1/meals/:meal_id/foods
```

Response Body
```
[
  {
      "id": 1,
      "name": "Apple",
      "calories": 150
  }
]
```

Response Code
```
200
```


**POST /api/v1/meals/:meal_id/foods/:food_id**
Add food corresponding to :food_id to meal corresponding to :meal_id

Request URL
```
/api/v1/meals/:meal_id/foods/:food_id
```

Response Body
```
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```

Response Code
```
201
```

**DELETE /api/v1/meals/:meal_id/foods/:food_id**
Remove food corresponding to :food_id from meal corresponding to :meal_id

Request URL
```
/api/v1/meals/:meal_id/foods/:food_id
```

Response Body
```
{
    "message": "Successfully removed FOODNAME from MEALNAME"
}
```

Response Code
```
200
```
