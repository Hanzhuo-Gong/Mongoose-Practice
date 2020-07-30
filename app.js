const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//new schema rating use the validation.
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Fruit name is required."]
  },

  rating: {
    type: Number,
    min: 1,
    max: [10, "rating above the maximum rating"]
  },
  review: String
});

//model
const Fruit = mongoose.model("Fruit", fruitSchema);

/*
//new object
const fruit = new Fruit ({
  name: "Apple",
  rating: 6,
  review: "Sweet apple"
});

const kiwi = new Fruit ({
  name: "kiwi",
  rating: 8,
  review: "taste good"
});

const banana = new Fruit ({
  name: "banana",
  rating: 9,
  review: "banananananana"
});*/

//For error testing when there's no name
const nameMissingFruits = new Fruit ({
  rating: 3,
  review: "idk what is this fruit, taste bad"
});

//Validation checking, since no name and name is required. This will return an error message and unable to add thi data to the database
//nameMissingFruits.save();

//update data
Fruit.update({_id: "5f233ebe401db0613656b430"}, {rating: "3"}, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Data have been update!");
  }
})

//delete data
Fruit.deleteMany({name: "Apple"}, {rating: "6" }, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Data have been deleted!");
  }
})


//insert the data, use the function to return error message if happened.
/*
Fruit.insertMany([kiwi,banana]),function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Saved all the fruits to fruits DB");
  }
}*/

//terminal will console log all the collections in fruits

Fruit.find(function(err, fruits) {
  if(err) {
    console.log(err);
  } else {
    console.log(fruits);
  }

  //Close the database: use this in the end of the code
  mongoose.connection.close();

  //Loop and print out each rating
  fruits.forEach(function(fruit) {
    console.log(fruit.name);
  });
});

//save the object into the fruits DB, **don't call it multiple times.
//fruit.save();


//another new schema in this collection
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema)

const person = new Person ({
  name: "Han",
  age: 25
});

//establish relationship
const pineApple = new Fruit({
  name: "PineApple",
  rating: 5,
  review: "I have a pen, and I have an apple"
});

const amy = new Person ({
  name: "Amy",
  age: 21,
  favoriteFruit: pineApple
});

//person.save();
amy.save();
pineApple.save();
