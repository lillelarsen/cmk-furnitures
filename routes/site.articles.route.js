const { showArticle, showArticlesList } = require('../controllers/site.articles.controller.js');

/**
 * @module route/Articles
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /nyheder
     * @param {Function} app Express objekt
     */
    app.get('/nyheder', showArticlesList);
    /**
     * Denne funktion håndtere GET metoden for endpointet /nyhed/:id
     * @param {Function} app Express objekt
     */
    app.get('/nyhed/:id', showArticle);
}