
import { Schema, model } from 'mongoose';

var productSchema = Schema({
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
  color: {
    type: String
  },
  size: {
    type: String
  },
  quantity: {
    type: Number
  }
});

var Product = module.exports = model('product', productSchema);

export function getAllProducts (query, sort, callback) {
  find(query, null, sort, callback)
}

export function getProductByDepartment (query, sort, callback) {
  find(query, null, sort, callback)
}

export function getProductByCategory (query, sort, callback) {
  find(query, null, sort, callback)
}

export function getProductByTitle (query, sort, callback) {
  find(query, null, sort, callback)
}

export function filterProductByDepartment (department, callback) {
  let regexp = new RegExp(`${department}`, 'i')
  var query = { department: { $regex: regexp } };
  find(query, callback)
}

export function filterProductByCategory (category, callback) {
  let regexp = new RegExp(`${category}`, 'i')
  var query = { category: { $regex: regexp } };
  find(query, callback);
}

export function filterProductByTitle (title, callback) {
  let regexp = new RegExp(`${title}`, 'i')
  var query = { title: { $regex: regexp } };
  find(query, callback);
}

export function getProductByID (id, callback) {
  findById(id, callback);
}

