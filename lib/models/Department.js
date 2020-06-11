// Object modelling for department. This model will represent in the database and
// we will read the all the information according to this model.
// You can think that this is a representation of the database and we are using that
// for saving, reading, updating information from the database.

import { Schema, model } from 'mongoose';

var departmentSchema = Schema({
    departmentName: {
        type: String,
        index: true
    },
    categories: {
        type: String
    }
});

var Department = module.exports = model('department', departmentSchema);

// These are functions to get data from the database. You can even reach the information
// without calling this functions but I just want to show you how you can add some functions
// to your model file to get specific data.

export function getAllDepartments (callback) {
    find(callback)
}
export function getDepartmentById (id, callback) {
    findById(id, callback);
}