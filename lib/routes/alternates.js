import { Router } from 'express';
var router = Router();

import { getAlternateByUniqueName, getAlternateByUniqueNames } from '../models/Alternates';

//GET /alternates/:id
router.get('/:id', function (req, res, next) {
    let alternateId = req.params.id;
    getAlternateByUniqueName(alternateId, function (e, item) {
        if (e) {
            e.status = 404; return next(e);
        }
        else {
            res.json({ alternate: item })
        }
    });
});

//GET product alternates with bunch of unique ids
router.get('/', function (req, res, next) {
    let alternateIds = alternateQueryString(req.query);
    getAlternateByUniqueNames(alternateIds, function (e, item) {
        if (e) {
            e.status = 404; return next(e);
        }
        else {
            res.json({ alternate: item })
        }
    });
});

function alternateQueryString(queryObj) {
    console.log(queryObj)
    let query = []

    //extract query, order, filter value
    for (const i in queryObj) {
        if (queryObj[i]) {
            // extract order
            if (i === 'alternateid') {
                query.push(queryObj[i])
                continue
            }
        }
    }
    return query
}

module.exports = router;
