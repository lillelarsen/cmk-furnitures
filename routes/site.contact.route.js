const { showContactForm, sendContactForm } = require('../controllers/site.contact.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');
/**
 * @module route/contact
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /contact
     * @param {Function} app Express objekt
     */
        app.get('/kontakt', showContactForm);
    /**
     * Denne funktion håndtere POST metoden for endpointet /contact
     * @param {Function} app Express objekt
     */
        app.post('/kontakt', sendContactForm);
}