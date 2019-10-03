const { 
    getArticles, 
    showArticleForm, 
    editArticle, 
    deleteArticle, 
    showArticleCreateForm, 
    createArticle
} = require('../controllers/admin.articles.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/Articles
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /createArticles
     * @param {Function} app Express objekt
     */
    app.get('/admin/createArticle', isAuthorized, isEmployee, showArticleCreateForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /createArticles/(den valgte Articles-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/createArticle', isAuthorized, isEmployee, createArticle);
    /**
     * Denne funktion håndtere GET metoden for endpointet /Articles
     * @param {Function} app Express objekt
     */
    app.get('/admin/articles', isAuthorized, isEmployee, getArticles);
    /**
     * Denne funktion håndtere GET metoden for endpointet /editArticles/(den valgte Articles-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/editArticle/:id', isAuthorized, isAdmin, showArticleForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /editArticles/(den valgte Articles-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/editArticle/:id', isAuthorized, isAdmin, editArticle);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /deleteArticles/(den valgte Articles-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteArticle/:id', isAuthorized, isAdmin, deleteArticle);
}