
import { Schema, model } from 'mongoose';
import { genSalt, hash as _hash, compare } from 'bcryptjs';

var userSchema = Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    },
    admin: {
        type: String
    },
    cart: {
        type: Object
    }
});

var User = module.exports = model('User', userSchema);

export function createUser (newUser, callback) {
    genSalt(10, function (err, salt) {
        _hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

export function getUserByEmail (email, callback) {
    var query = { email: email };
    findOne(query, callback);
}


export function getUserById (id, callback) {
    findById(id, callback);
}
export function comparePassword (givenPassword, hash, callback) {
    compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

export function getAllUsers (callback) {
    find(callback)
}