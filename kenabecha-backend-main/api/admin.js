const express = require('express'); // module
const router = express.Router(); // module
const utils = require('../helpers/utils');
const { connection } = require('../db');

router.post('/locations/new', async (req, res) => {
    let con = connection();
    let locationName = req.body.locationName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS locations (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            
            console.log("Location Table Created");
        });

        query = `SELECT * FROM locations WHERE title='${locationName}'`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                let token = utils.makeToken('Location');
                let slug = utils.makeSlug(locationName);
                query = `INSERT INTO locations (title, token, slug) VALUES ('${locationName}', '${token}', '${slug}')`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    res.send({
                        'data': {
                            'code': 'INSERTION_SUCCESSFUL',
                            'details': 'Location Added',
                        },
                        'error': {}
                    });
                });
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': 'LOCATION ALREADY EXISTS',
                        'errorDetails': "The given location already exists",
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
})

router.post('/categories/new', async (req, res) => {
    let con = connection();
    let categoryName = req.body.categoryName;

    try {

        let query = "CREATE TABLE IF NOT EXISTS categories (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Category Table Created");
        });

        let token = utils.makeToken('Category');
        let slug = utils.makeSlug(categoryName);
        query = `INSERT INTO categories (title, token, slug) VALUES ('${categoryName}', '${token}', '${slug}')`
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Category Added',
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
})

module.exports = router;