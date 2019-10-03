const { showRoleCreateForm, getRoles, showRoleForm, editRole, deleteRole, createRole } = require('../controllers/admin.roles.controller');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/roles
 */

 module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /admin/createRole
     * @param {Function} app Express objekt
     */
    app.get('/admin/createRole', isAuthorized, isEmployee, showRoleCreateForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /admin/createRole/(den valgte Role-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/createRole', isAuthorized, isEmployee, createRole);
     /**
     * Denne funktion håndtere GET metoden for endpointet /admin/roles
     * @param {Function} app Express objekt
     */
      app.get('/admin/roles', isAuthorized, isEmployee, getRoles);
    /**
     * Denne funktion håndtere GET metoden for endpointet /admin/editRole/(den valgte Role-id)
     * @param {Function} app Express objekt
     */
      app.get('/admin/editRole/:id', isAuthorized, isAdmin, showRoleForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /admin/editRole/(den valgte Role-id)
     * @param {Function} app Express objekt
     */
      app.post('/admin/editRole/:id', isAuthorized, isAdmin, editRole);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /admin/deleteRole/(den valgte Role-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteRole/:id', isAuthorized, isAdmin, deleteRole);
 }