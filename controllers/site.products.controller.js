const db = require('../config/mysql');
const { searchProduct, getProductByCategory, getOneProduct } = require('../models/products.model');
const { getCategories } = require('../models/categories.model');
const { showImageByProductId } = require('../models/images.model');
/**
 * @module controller/products
 */

 /**
 * Denne funktion retunerer products.ejs med data/søgeværdier
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.searchProducts = async function(req, res, next) {    
    try {       
        const result = await searchProduct(req.query);
        const [categoryRows] = await getCategories();
        res.render('client/products', { 
            'title': 'Produkter', 
            'content': 'en liste over produkter', 
            'products': result.rows,
            'categories': categoryRows,
            'total_pages': result.total_pages,
            'current_page': result.current_page,
            'itemsPerPage': result.limit,
            'page_number': result.values.page,
            'name': result.values.name,
            'globalsearch': result.values.globalsearch,
            'category': result.values.category,
            'minimumprice': result.values.minimumprice,
            'maximumprice': result.values.maximumprice
        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde resultater");
    }
}

/**
 * Denne funktion retunerer product.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showProduct = async function(req, res, next) {
    try {
        const [productRows] = await getOneProduct(req.params.id);
        const [imageRows] = await showImageByProductId(req.params.id);
        res.render('client/product', { 'title': 'Møbler', 'name': productRows[0].name, 'product': productRows[0], 'images': imageRows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bruger");
    }
}

/**
 * Denne funktion retunerer categories-list.ejs eller categories.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showCategory = async function(req, res, next) {
    try {
        const [userRows] = await getProductByCategory(req.params.id);
        const [categoryRows] = await getCategories();

        if(req.params.id == 0 || req.params.id == 'undefined') {
            res.render('client/categories', { 'title': 'Redigér', 'content': 'Redigér kategorien','categories': categoryRows  });
        } else {
            res.render('client/categories-list', { 'title': 'Redigér', 'content': 'Redigér kategorien', 'products': userRows, 'categories': categoryRows  });
        }
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bruger");
    }
}

