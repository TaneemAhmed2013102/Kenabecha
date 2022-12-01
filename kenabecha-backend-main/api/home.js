const express = require('express'); // module
const router = express.Router(); // module
const utils = require('../helpers/utils');
const { connection } = require('../db');
const fs = require("fs");
const path = require('path');
const ba64 = require("ba64");
const { SystemVars } = require('../systemVars');


router.get('/locations', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM locations`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
                },
                'error': {}
            })
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.get('/locations/popular', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM locations ORDER BY RAND() LIMIT 4`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
                },
                'error': {}
            })
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.get('/categories', async (req, res) => {
    let con = connection();

    try {
        let query = "CREATE TABLE IF NOT EXISTS ads (token VARCHAR(255), title VARCHAR(255), description VARCHAR(255), image VARCHAR(255), price INT(255), isNegotiable BOOL, phoneNumber VARCHAR(255), locationSlug VARCHAR(255), categorySlug VARCHAR(255), createdBy VARCHAR (255), sold VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Ads Table Accessed");
        });

        query = `SELECT categories.title, categories.slug, (SELECT COUNT(*) FROM ads WHERE categorySlug=categories.slug AND sold='No') AS adsCount FROM categories;`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
                },
                'error': {}
            })
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.get('/categories/popular', async (req, res) => {
    let con = connection();

    try {
        let query = `SELECT * FROM categories ORDER BY RAND() LIMIT 4`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
                },
                'error': {}
            })
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.post('/ads', async (req, res) => {
    let con = connection();
    let location = req.body.location;
    let category = req.body.category;

    try {
        let query = "CREATE TABLE IF NOT EXISTS ads (token VARCHAR(255), title VARCHAR(255), description VARCHAR(255), image VARCHAR(255), price INT(255), isNegotiable BOOL, phoneNumber VARCHAR(255), locationSlug VARCHAR(255), categorySlug VARCHAR(255), createdBy VARCHAR (255), sold VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Ads Table Accessed");
        });

        let locationQuery = '';
        let categoryQuery = '';

        if (location !== "all") {
            locationQuery=` AND locationSlug='${location}'`
        }

        if (category !== "all") {
            categoryQuery=` AND categorySlug='${category}'`
        }

        let token = utils.makeToken("Ads"); 
        query = `SELECT * FROM ads WHERE sold='No'${locationQuery}${categoryQuery} ORDER BY createdAt DESC`;

        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': {
                        'items': result,
                        'itemsCount': result.length,
                    },
                },
                'error': {}
            })
        });

    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.get('/ads/details/:adToken', async(req, res) => {
    let con = connection();
    let adToken = req.params.adToken;
    try {
        let query = `SELECT * FROM (SELECT ads.title, ads.token AS adsToken, ads.description, ads.price, ads.createdBy, ads.phoneNumber, ads.image, ads.isNegotiable, ads.createdAt, users.name, users.email 
                    FROM ads 
                    INNER JOIN users ON ads.createdBy=users.userToken) AS adsDetails WHERE adsToken='${adToken}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 1) {
                res.send({
                    'data': {
                        'code': 'LIST_LOADED',
                        'details': result[0],
                    },
                    'error': {}
                });
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'Invalid Ad Token',
                        'errorDetails': 'No data found with the given ad token',
                    }
                });
            }
        });
    } catch (error) {
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

router.post('/upload', async(req, res) => {
    let image = req.body.image;
    let uploadDir = path.join(SystemVars.DIR_NAME, "images");
    if (fs.existsSync(uploadDir)) {
        try {
            let imageToken = utils.makeToken("Image");
            let saveImage = ba64.writeImageSync(path.join(uploadDir, imageToken), image);
            let extension = image.split(';')[0].split('/')[1];
            res.send(imageToken + '.' + extension);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

})

module.exports = router;