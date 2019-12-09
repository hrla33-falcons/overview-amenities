const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amenities-overview', { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB connected successfully"));


let listingDetailsSchema = mongoose.Schema({
  listing_ID: Number,
  propertyType: String, 
  overview: {
    "Sleeps": Number,
    "Bedrooms": Number,
    "Bathrooms": Number,
    "Half Baths": Number,
    "Min Stay": String,
  },
  amenities: {
    "Featured": [String],
    "Safety Features": [String],
    "Location Type": [String],
    "General": [String],
    "Kitchen": [String],
    "Dining": [String],
    "Entertainment": [String],
    "Outside": [String],
    "Pool/Spa": [String]
  },
  houseRules: {
    rules: [String],
    minAge: Number
  },
  tags: [String],
  imageIcons: {}
})

let listingDetails = mongoose.model('listingDetails', listingDetailsSchema);

let getAllListings = () => {
  // get all listings stored in the database
  return new Promise((resolve, reject) => {
    listingDetails.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    })
  })
}

let getOneListing = (id) => {
  return new Promise((resolve, reject) => {
    listingDetails.find({ listing_ID: id }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    })
  })
}

module.exports = {
  listingDetails,
  getAllListings,
  getOneListing
}