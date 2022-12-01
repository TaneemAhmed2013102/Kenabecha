const express = require('express');
const router = express.Router();
const utils = require('../helpers/utils');
const { connection } = require('../db');
const fs = require("fs");
const path = require('path');
const ba64 = require("ba64");
const { SystemVars } = require('../systemVars');

router.post('/ads/new', async (req, res) => {
    let con = connection();
    let title = req.body.title;
    let description = req.body.description;
    let price = parseInt(req.body.price);
    let isNegotiable = req.body.isNegotiable;
    let phoneNumber = req.body.phoneNumber;
    let image = req.body.image;
    let categorySlug = req.body.categorySlug;
    let locationSlug = req.body.locationSlug;
    let createdBy = req.headers.usertoken;

    try {
        let query = "CREATE TABLE IF NOT EXISTS ads (token VARCHAR(255), title VARCHAR(255), description VARCHAR(255), image VARCHAR(255), price INT(255), isNegotiable BOOL, phoneNumber VARCHAR(255), locationSlug VARCHAR(255), categorySlug VARCHAR(255), createdBy VARCHAR (255), sold VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Ads Table Accessed");
        });

        let uploadDir = path.join(SystemVars.DIR_NAME, "images");
        let newImageName = "";
        if (fs.existsSync(uploadDir)) {
            let imageToken = utils.makeToken("Image");
            let saveImage = ba64.writeImageSync(path.join(uploadDir, imageToken), image);
            let extension = image.split(';')[0].split('/')[1];
            newImageName = imageToken + '.' + extension;
        }

        let token = utils.makeToken("Ads"); 
        query = `INSERT INTO ads (token, title, description, image, price, isNegotiable, phoneNumber, locationSlug, categorySlug, createdBy, sold) VALUES('${token}', '${title}', '${description}', '${newImageName}', ${price}, ${isNegotiable}, '${phoneNumber}', '${locationSlug}', '${categorySlug}', '${createdBy}', 'No')`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Ad Posted!',
                },
                'error': {}
            });
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

router.get('/ads', async (req, res) => {
    let con = connection();
    let createdBy = req.headers.usertoken;

    try {
        let query = "CREATE TABLE IF NOT EXISTS ads (token VARCHAR(255), title VARCHAR(255), description VARCHAR(255), image VARCHAR(255), price INT(255), isNegotiable BOOL, phoneNumber VARCHAR(255), locationSlug VARCHAR(255), categorySlug VARCHAR(255), createdBy VARCHAR (255), sold VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            console.log("Ads Table Accessed");
        });

        let token = utils.makeToken("Ads"); 
        query = `SELECT * FROM ads WHERE createdBy='${createdBy}' ORDER BY createdAt DESC`;
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

router.get('/mark/sold/:adToken', async (req, res) => {
    let con = connection();
    let userToken = req.headers.usertoken;
    let adToken = req.params.adToken;

    try {
        let query = `UPDATE ads SET sold='Yes' WHERE createdBy='${userToken}' AND token='${adToken}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            res.send({
                'data': {
                    'code': 'INSERTION_SUCCESSFUL',
                    'details': 'Item marked as sold',
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

router.get('/details', async (req, res) => {
    let con = connection();
    let userToken = req.headers.usertoken;

    // console.log(req.headers);
    try {
        let query = `SELECT users.name, users.email, users.userToken, (SELECT COUNT(*) FROM ads WHERE createdBy='${userToken}' AND sold='No') as totalRunningAds, (SELECT COUNT(*) FROM ads WHERE createdBy='${userToken}' AND sold='Yes') as soldAds FROM users WHERE userToken='${userToken}'`;
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            // console.log(result);
            res.send({
                'data': {
                    'code': 'LIST_LOADED',
                    'details': result[0],
                },
                'error': {}
            });
        });
    } catch (error) {
        // console.log(error);
        res.send({
            'data': {},
            'error': {
                'errorCode': 'Query failed at try catch',
                'errorDetails': error,
            }
        });
    }
});

module.exports = router;