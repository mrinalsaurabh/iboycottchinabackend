
import { Schema, model } from 'mongoose';

var variantSchema  = Schema({
    productID: {
        type: String
    },
    imagePath: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    quantity: {
        type: Number
    },
    title: {
        type: String
    },
    price: {
        type: Number
    }
});

var Variant = module.exports = model('Variant', variantSchema);

export function getVariantByID(id, callback){
    findById(id, callback);
}

export function getVariantProductByID(id, callback){
    var query = {productID: id};
    find(query, callback);
}
export function getAllVariants(callback){
    find(callback)
}