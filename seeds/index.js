const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 25) + 10;
    const camp = new Campground({
      author: "69133a22698cf97b181d047b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dyehvvzca/image/upload/v1764079387/YelpCamp/isaytuq04o4ixy1jphho.jpg",
          filename: "YelpCamp/isaytuq04o4ixy1jphho",
        },
        {
          url: "https://res.cloudinary.com/dyehvvzca/image/upload/v1764079388/YelpCamp/dalypxtrp0bthmotznzo.jpg",
          filename: "YelpCamp/dalypxtrp0bthmotznzo",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non interdum sem, eu viverra tortor. Ut ullamcorper nec tellus id pharetra. Pellentesque sed suscipit ipsum. Curabitur ac blandit ex. Pellentesque at felis et leo ultricies aliquam eu sit amet ipsum. Integer quis tortor vehicula, eleifend leo sit amet, accumsan lectus. ",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
