const utils = require('../helpers/utils');
const { connection } = require('../db');

module.exports = {
    adjustCategory: async (req, res) => {
        let con = connection();
        let query = "SELECT * FROM categories";
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            }

            query = "DROP TABLE categories";
            con.query(query, (err, result) => {
                if (err) {
                    throw err;
                }

                console.log("Category Table Dropped");
            });

            query = "CREATE TABLE IF NOT EXISTS categories (title VARCHAR(255), token VARCHAR(255), slug VARCHAR(255))"
            con.query(query, (err, result) => {
                if (err) {
                    throw err;
                }

                console.log("Category Table Created");
            });

            for (let i = 0; i < result.length; i++) {
                const currElem = result[i];
                query = `SELECT * FROM categories WHERE title='${currElem.title}'`
                con.query(query, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    if (result.length === 0) {
                        let slug = utils.makeSlug(currElem.title);
                        query = `INSERT INTO categories (title, token, slug) VALUES ('${currElem.title}', '${currElem.token}', '${slug}')`
                        con.query(query, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                });
            }
        });

        res.send("MEOW");
    },
}