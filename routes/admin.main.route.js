const { main, editGlobals } = require('../controllers/admin.main.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/main
 */

module.exports = function(app) {
        /**
         * Denne funktion håndtere GET metoden for endpointet /
         * @param {Function} app Express objekt
         */
        app.get('/admin', isAuthorized, isAdmin, main);

        /**
         * Denne funktion håndtere POST metoden der opdaterer for endpointet /editGlobals
         * @param {Function} app Express objekt
         */
        app.post('/admin', isAuthorized, isAdmin, editGlobals);
}