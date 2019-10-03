const { 
    getProducts, 
    showProductForm, 
    editProduct, 
    deleteProduct, 
    showProductCreateForm, 
    createProduct,
    setPrimaryImage,
    productImageRemove 
} = require('../controllers/admin.products.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/users
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /createProduct
     * @param {Function} app Express objekt
     */
    app.get('/admin/createProduct', isAuthorized, isEmployee, showProductCreateForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /createProduct/(den valgte Product-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/createProduct', isAuthorized, isEmployee, createProduct);
    /**
     * Denne funktion håndtere GET metoden for endpointet /products
     * @param {Function} app Express objekt
     */
    app.get('/admin/products', isAuthorized, isEmployee, getProducts);
    /**
     * Denne funktion håndtere GET metoden for endpointet /editProduct/(den valgte Product-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/editProduct/:id', isAuthorized, isAdmin, showProductForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /editProduct/(den valgte Product-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/editProduct/:id', isAuthorized, isAdmin, editProduct);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /deleteProduct/(den valgte Product-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteProduct/:id', isAuthorized, isAdmin, deleteProduct);
    /**
     * Denne funktion håndtere POST metoden for endpointet /setPrimaryImage
     * @param {Function} app Express objekt
     */
    app.post('/setPrimaryImage', setPrimaryImage);
    /**
     * Denne funktion håndtere POST metoden for endpointet /setPrimaryImage
     * @param {Function} app Express objekt
     */
    app.get('/productImageRemove/:id', productImageRemove);
}