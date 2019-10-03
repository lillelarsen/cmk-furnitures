const { getMessages, showMessage, deleteMessage } = require('../controllers/admin.contact.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');
/**
 * @module route/contact
 */

module.exports = function(app) {
   /**
     * Denne funktion håndtere GET metoden for endpointet /admin/messages
     * @param {Function} app Express objekt
     */
    app.get('/admin/messages', isAuthorized, isEmployee, getMessages);
    /**
     * Denne funktion håndtere GET metoden for endpointet /admin/readMessage/:id
     * @param {Function} app Express objekt
     */
    app.get('/admin/readMessage/:id', isAuthorized, isAdmin, showMessage);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /admin/deleteMessage/:id
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteMessage/:id', isAuthorized, isAdmin, deleteMessage);
}