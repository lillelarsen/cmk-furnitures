const db = require('../config/mysql');
/**
 * @module Model/products
 */

/**
 * Denne funktion opretter produkt i DB-tabellen products
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.createProduct = async function(objectInsert) {
    try {
        const productSQL = `INSERT INTO products SET name = :name, description = :description, price = :price, year = :year, item_number = :itemNumber,  fk_category = :category,  fk_designer = :designer`;
        return await db.query(productSQL, {objectInsert});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion tæller produkter i DB-tabellen products
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.countProducts = async function(objectInsert) {
    try {
        return await db.execute('SELECT COUNT(*) AS total_items FROM products');
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen products
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getOneProduct = async function(id) {
    try {
        const productSQL = `SELECT products.id AS id, products.name AS name, products.description, products.fk_category, price, year, item_number, designers.name AS designer, categories.name AS category,
                            categories.name AS category, categories.id AS categoryId FROM products 
                        INNER JOIN categories ON products.fk_category = categories.id
                        INNER JOIN designers ON products.fk_designer = designers.id
                        WHERE products.id = :id`;
        return await db.query(productSQL, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen products
 * @param {Object} id - Placeholder for kolonnen id
 */
exports.getProducts = async function(objectInsert) {
    try {
        const productSQL = `SELECT products.id, products.name, products.description, products.price, products.year, products.item_number, categories.name AS category 
                        FROM products 
                        INNER JOIN categories ON products.fk_category = categories.id
                        ORDER BY products.name
                        LIMIT :productlimit OFFSET :productoffset`;
        return await db.query(productSQL, objectInsert);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen products via category
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getProductByCategory = async function(id) {
    try {
        const productSQL = `SELECT products.id AS productid, products.name, products.description, products.fk_category, categories.name AS category, categories.id FROM products 
        INNER JOIN categories ON products.fk_category = categories.id
        WHERE products.fk_category = :id`;
        return await db.query(productSQL, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion sletter data fra DB-tabellen products
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteProduct = async function(id) {
    try {
        const productSQL = `DELETE FROM products WHERE id = :id`;
        return await db.query(productSQL, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion sletter data fra DB-tabellen products
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.updateProduct = async function(objectInsert) {
    try {
        const productSQL = `UPDATE products SET  name = :name, description = :description, price = :price, year = :year, item_number = :itemNumber,  fk_category = :category,  fk_designer = :designer WHERE id = :id`;
        return await db.query(productSQL, objectInsert);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion sletter data fra DB-tabellen products
 * @param {Object} fields - Placeholder for søgefelter/req.fields
 */
exports.searchProduct = async function(fields) {
    try {
        let searchSQL = `SELECT products.id, products.name, products.description, products.price, products.year, designers.name AS designer, products.item_number, categories.name AS category, 
                        (SELECT images.name FROM images WHERE products.id = images.fk_product LIMIT 1) AS image
                        FROM products 
                        INNER JOIN categories ON products.fk_category = categories.id
                        INNER JOIN designers ON products.fk_designer = designers.id
                        WHERE 1=1`;

        let countSQL = `SELECT COUNT(*) AS total_items FROM products WHERE 1=1`;

        // hent værdierne fra querystring
    let values = fields;

    // tjek alle de værdier vi ønsker at kunne benytte i søgningen
    // sæt standard værdier hvis noget mangler
    if (values.name == undefined) {
        values.name = '';
    }
    if (values.category == undefined) {
        values.category = '';
    }
    if (values.producent == undefined) {
        values.producent = '';
    }
    if (values.globalsearch == undefined) {
        values.globalsearch = '';
    }
    if (values.minimumprice == undefined || isNaN(values.minimumprice)) {
        values.minimumprice = '';
    }
    if (values.maximumprice == undefined || isNaN(values.maximumprice)) {
        values.maximumprice = '';
    }
    if (parseInt(values.minimumprice) > parseInt(values.maximumprice)) {
        let temp = values.maximumprice;
        values.maximumprice = values.minimumprice;
        values.minimumprice = temp;
    }
    ////////////////////////////////////////////////////////////////////////
    // bestem hvor mange elementer der skal vises pr side
    if (values.items == undefined) {
        values.items = 10;
    }
    let limit = parseInt(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/produkter');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
        // beregn hvor mange produkter der skal springes over 
        // for at vise den pågældende side
         let offset = (current_page - 1) * limit;
 
         if(offset == '' && offset == undefined) {
             offset = 0;
         }
 
        // start params samlingen, den skal bare være tom til at starte med
        let sql_params = []

        if (values.name != undefined && values.name != '') {
            searchSQL += ' AND products.name LIKE ? ';
            countSQL += ' AND products.name LIKE ? ';
            sql_params.push('%' + values.name + '%');
        }
        if (values.globalsearch != undefined && values.globalsearch != '') {
            searchSQL += ' AND (products.name LIKE ? OR products.description LIKE ? )';
            countSQL += ' AND (products.name LIKE ? OR products.description LIKE ? )';
            sql_params.push('%' + values.globalsearch + '%');
            sql_params.push('%' + values.globalsearch + '%');
        }

        if (Object.prototype.toString.call(values.category) === "[object array]") {
            searchSQL += ` AND ( `;
            sqlParts = [];

            values.category.forEach(value => {
                sqlParts.push(` (products.fk_category = ${value}) `);
            });

            searchSQL += sqlParts.join(' OR ')

            searchSQL += ` ) `;

            countSQL += ` AND ( `;
            sqlPartsCount = [];

            values.category.forEach(value => {
                sqlPartsCount.push(` (products.fk_category = ${value}) `);
            });

            countSQL += sqlPartsCount.join(' OR ')

            countSQL += ` ) `;
        } else if (values.category != undefined && values.category != '') {
                searchSQL += ' AND products.fk_category = ? ';
                countSQL += ' AND products.fk_category = ? ';
                sql_params.push(parseInt(values.category));
        }

        if (values.producent != undefined && values.producent != '') {
            searchSQL += ' AND fk_producent_id = ? ';
            countSQL += ' AND fk_producent_id = ? ';
            sql_params.push(values.producent);
        }
        if (values.minimumprice != undefined && values.minimumprice != '') {
            searchSQL += ' AND products.price >= ? ';
            countSQL += ' AND products.price >= ? ';
            sql_params.push(parseInt(values.minimumprice));
        }
        if (values.maximumprice != undefined && values.maximumprice != '') {
            searchSQL += ' AND products.price <= ? ';
            countSQL += ' AND products.price <= ? ';
            sql_params.push(parseInt(values.maximumprice));
        }

        if (values.page != undefined && values.page != '' && values.items != undefined && values.items != '') {
            values.page = 1;
            values.items = 10;
        }

        if (values.page != undefined && values.page != '' && values.items != undefined && values.items != '') {
            if (limit >= 0 && offset >= 0) {
                searchSQL += ' LIMIT ? OFFSET ? ';
                sql_params.push(limit, offset);
            }
        }

         // find ud af hvor mange produkter der er i databasen
         let [result] = await db.execute(countSQL, sql_params);
         console.log(result);
         
         let total_items = result[0].total_items;
 
         // beregn hvor mange sider der er i alt, 
         // baseret på antal elementer og elementer pr side
         let total_pages = Math.ceil(total_items / limit);
 
         // hvis "offset" er større end totalle antal items, så indlæses den sidste side
         if (offset > total_items) {
             res.redirect(`/produkter?page=${total_pages}&items=${limit}`);
             return;
         }

         const [rows] = await db.query(searchSQL, sql_params);
         return {
            rows,
            total_pages,
            current_page,
            limit,
            values
         }
        } catch (error) {
            console.log(error);
            return null;
        }
}