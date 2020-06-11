import { Router } from 'express';
var router = Router();

import { getAllProducts, getProductByID } from '../models/Product';

//GET /products
router.get('/', function (req, res, next) {
    const { query, order } = categorizeQueryString(req.query)
    getAllProducts(query, order, function (e, products) {
        if (e) {
            e.status = 406; return next(e);
        }
        if (products.length < 1) {
            return res.status(404).json({ message: "products not found" })
        }
        res.json({ products: products })
    });
});

//GET /products/:id
router.get('/:id', function (req, res, next) {
    let productId = req.params.id;
    getProductByID(productId, function (e, item) {
        if (e) {
            e.status = 404; return next(e);
        }
        else {
            res.json({ product: item })
        }
    });
});

function categorizeQueryString(queryObj) {
    let query = {}
    let order = {}
    //extract query, order, filter value
    for (const i in queryObj) {
        if (queryObj[i]) {
            // extract order
            if (i === 'order') {
                order['sort'] = queryObj[i]
                continue
            }
            // extract range
            if (i === 'range') {
                let range_arr = []
                let query_arr = []
                // multi ranges
                if (queryObj[i].constructor === Array) {
                    for (const r of queryObj[i]) {
                        range_arr = r.split('-')
                        query_arr.push({
                            price: { $gt: range_arr[0], $lt: range_arr[1] }
                        })
                    }
                }
                // one range
                if (queryObj[i].constructor === String) {
                    range_arr = queryObj[i].split('-')
                    query_arr.push({
                        price: { $gt: range_arr[0], $lt: range_arr[1] }
                    })
                }
                Object.assign(query, { $or: query_arr })
                delete query[i]
                continue
            }
            query[i] = queryObj[i]
        }
    }
    return { query, order }
}

module.exports = router;