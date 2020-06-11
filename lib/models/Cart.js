
import { Schema, model } from 'mongoose'

var CartSchema = Schema({
  items: {
    type: Object
  },
  totalQty: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  userId: {
    type: String
  }
})

var Cart = module.exports = model('Cart', CartSchema)

export function getCartByUserId (uid, callback) {
  let query = { userId: uid }
  find(query, callback)
}

export function getCartById (id, callback) {
  findById(id, callback)
}

export function updateCartByUserId (userId, newCart, callback) {
  let query = { userId: userId }
  find(query, function (err, c) {
    if (err) throw err

    //exist cart in databse
    if (c.length > 0) {
      findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            items: newCart.items,
            totalQty: newCart.totalQty,
            totalPrice: newCart.totalPrice,
            userId: userId
          }
        },
        { new: true },
        callback
      )
    } else {
      //no cart in database
      newCart.save(callback)
    }
  })
}

export function updateCartByCartId (cartId, newCart, callback) {
  findById(
    { _id: cartId },
    {
      $set: newCart
    },
    callback
  )
}



export function createCart (newCart, callback) {
  newCart.save(callback)
}