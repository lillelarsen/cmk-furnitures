const { showCategoryCreateForm, getCategories, showCategoryForm, editCategory, deleteCategory, createCategory } = require('../controllers/admin.categories.controller');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/categories
 */

 module.exports = function(app) {

    /**
     * Denne funktion håndtere GET metoden for endpointet /createCategory
     * @function get
     * @param {string} /admin/createCategory - den ønskede sti
     * @param {Function} isAuthorized - Tjekker om brugeren har en session
     * @param {Function} isEmployee - Tjekker om brugeren har adgang
     * @param {Function} showCategoryCreateForm - Den ønskede controller
     * @return Stien med controllerens egenskaber
     */
    app.get('/admin/createCategory', isAuthorized, isEmployee, showCategoryCreateForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /category/(den valgte category-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/createCategory', isAuthorized, isEmployee, createCategory);
     /**
     * Denne funktion håndtere GET metoden for endpointet /categories
     * @param {Function} app Express objekt
     */
      app.get('/admin/categories', isAuthorized, isEmployee, getCategories);
    /**
     * Denne funktion håndtere GET metoden for endpointet /editCategory/(den valgte category-id)
     * @param {Function} app Express objekt
     */
      app.get('/admin/editCategory/:id', isAuthorized, isAdmin, showCategoryForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /editCategory/(den valgte category-id)
     * @param {Function} app Express objekt
     */
      app.post('/admin/editCategory/:id', isAuthorized, isAdmin, editCategory);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /category/(den valgte category-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteCategory/:id', isAuthorized, isAdmin, deleteCategory);
 }