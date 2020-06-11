
var mongoose = require('mongoose');

var alternateSchema = mongoose.Schema({
  uniquename: {
    type: String
  },
  imagePath: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  department: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  origin: {
    type: String
  },
  source: {
    type: String
  }
});

var Alternate = module.exports = mongoose.model('alternate', alternateSchema);

module.exports.getAllAlternates = function (query, sort, callback) {
  Alternate.find(query, null, sort, callback)
}

module.exports.getAlternateByDepartment = function (query, sort, callback) {
  Alternate.find(query, null, sort, callback)
}

module.exports.getAlternateByCategory = function (query, sort, callback) {
  Alternate.find(query, null, sort, callback)
}

module.exports.getAlternateByTitle = function (query, sort, callback) {
  Alternate.find(query, null, sort, callback)
}

module.exports.filterAlternateByDepartment = function (department, callback) {
  let regexp = new RegExp(`${department}`, 'i')
  var query = { department: { $regex: regexp } };
  Alternate.find(query, callback)
}

module.exports.filterAlternateByCategory = function (category, callback) {
  let regexp = new RegExp(`${category}`, 'i')
  var query = { category: { $regex: regexp } };
  Alternate.find(query, callback);
}

module.exports.filterAlternateByTitle = function (title, callback) {
  let regexp = new RegExp(`${title}`, 'i')
  var query = { title: { $regex: regexp } };
  Alternate.find(query, callback);
}

module.exports.getAlternateByUniqueName = function (id, callback) {
  var query = { uniquename: id };
  Alternate.findOne(query, callback);
}

module.exports.getAlternateByUniqueNames = function (ids, callback) {
  var query = { uniquename: { $in: ids } };
  if (ids.length == 0) {
    Alternate.find(null, callback);
  }
  else {
    Alternate.find(query, callback);
  }
}

module.exports.getAlternateByID = function (id, callback) {
  Alternate.findById(id, callback);
}

