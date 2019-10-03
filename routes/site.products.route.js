const { 
    searchProducts, 
    showProduct, 
    showCategory
} = require('../controllers/site.products.controller.js');

/**
 * @module route/users
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /produkter
     * @param {Function} app Express objekt
     */
    app.get('/produkter', searchProducts);
    /**
     * Denne funktion håndtere GET metoden for endpointet /produkt/:id
     * @param {Function} app Express objekt
     */
    app.get('/produkt/:id', showProduct);
    /**
     * Denne funktion håndtere GET metoden for endpointet /produkter
     * @param {Function} app Express objekt
     */
    app.get('/produkter/:id', showCategory);
}