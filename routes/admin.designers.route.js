const { showDesignerCreateForm, getDesigners, showDesignerForm, editDesigner, deleteDesigner, createDesigner } = require('../controllers/admin.designers.controller');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

/**
 * @module route/designers
 */

 module.exports = function(app) {
    /**
     * Denne funktion håndtere GET metoden for endpointet /createDesigner
     * @param {Function} app Express objekt
     */
    app.get('/admin/createDesigner', isAuthorized, isEmployee, showDesignerCreateForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /Designer/(den valgte Designer-id)
     * @param {Function} app Express objekt
     */
    app.post('/admin/createDesigner', isAuthorized, isEmployee, createDesigner);
     /**
     * Denne funktion håndtere GET metoden for endpointet /Designers
     * @param {Function} app Express objekt
     */
      app.get('/admin/designers', isAuthorized, isEmployee, getDesigners);
    /**
     * Denne funktion håndtere GET metoden for endpointet /editDesigner/(den valgte Designer-id)
     * @param {Function} app Express objekt
     */
      app.get('/admin/editDesigner/:id', isAuthorized, isAdmin, showDesignerForm);
    /**
     * Denne funktion håndtere POST metoden der opdaterer for endpointet /editDesigner/(den valgte Designer-id)
     * @param {Function} app Express objekt
     */
      app.post('/admin/editDesigner/:id', isAuthorized, isAdmin, editDesigner);
    /**
     * Denne funktion håndtere DELETE metoden der sletter for endpointet /Designer/(den valgte Designer-id)
     * @param {Function} app Express objekt
     */
    app.get('/admin/deleteDesigner/:id', isAuthorized, isAdmin, deleteDesigner);
 }