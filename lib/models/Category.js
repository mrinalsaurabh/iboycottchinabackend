// Object modelling for category. This model will represent in the database and
// we will read the all the information according to this model.
// You can think that this is a representation of the database and we are using that
// for saving, reading, updating information from the database.

import { Schema, model } from 'mongoose';

var categorySchema  = Schema({
    categoryName: {
        type: String,
        index   : true
    }
});

var Category = module.exports = model('Categories', categorySchema);

// These are functions to get data from the database. You can even reach the information
// without calling this functions but I just want to show you how you can add some functions
// to your model file to get specific data.

export function getAllCategories(callback){
    find(callback)
}

export function getCategoryById(id, callback){
    findById(id, callback);
}