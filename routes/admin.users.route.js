const { getUsers, showUserForm, editUser, deleteUser } = require('../controllers/admin.users.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/users
 */

module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /users
     * @param {Function} app Express objekt
     */
        app.get('/admin/users', isAuthorized, isEmployee, getUsers);
    /**
     * Denne funktion håndtere GET metoden for endpointet /user/(den valgte user-id)
     * @param {Function} app Express objekt
     */
        app.get('/admin/editUser/:id', isAuthorized, isAdmin, showUserForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /users/(den valgte user-id)
     * @param {Function} app Express objekt
     */
        app.post('/admin/editUser/:id', isAuthorized, isAdmin, editUser);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /users/(den valgte user-id)
     * @param {Function} app Express objekt
     */
        app.get('/admin/deleteUser/:id', isAuthorized, isAdmin, deleteUser);

}