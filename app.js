const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//new schema
const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

//model
const Fruit = mongoose.model("Fruit", fruitSchema);

//new object
const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
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
});

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
    console.log(fruit.rating);
  });
});

//save the object into the fruits DB, **don't call it multiple times.
//fruit.save();

//another new schema in this collection
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema)

const person = new Person ({
  name: "Han",
  age: 25
});

//person.save();
