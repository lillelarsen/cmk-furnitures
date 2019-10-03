const { subscribeNewsletter, unsubscribeNewsletter } = require('../controllers/site.newsletter.controller.js');

/**
 * @module route/signup
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /signup
     * @param {Function} app Express objekt
     */
        app.post('/subscribe', subscribeNewsletter);
        app.post('/deleteSubscription', unsubscribeNewsletter);

}