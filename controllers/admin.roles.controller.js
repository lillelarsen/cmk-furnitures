const { 
    createRole, 
    getRoles, 
    showRoleEditForm, 
    updateRole, 
    deleteRole 
} = require('../models/roles.model');
/**
 * @module controller/roles
 */

 /**
 * Denne funktion returnerer create-role.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showRoleCreateForm = async function(req, res, next) {
    try {
        res.render('admin/create-role', { 'title': 'Opret rolle', 'content': 'Opret rolle i formen'});
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST en role
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createRole = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            level: req.fields.level       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.level == "") {
        req.session.flash = { 
            levelError:"Level skal udfyldes",
            name: req.fields.name,
            level: req.fields.level       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const role = await createRole({name: req.fields.name, level: req.fields.level});
        res.redirect('/admin/roles');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette rolle");
    }
}

/**
 * Denne funktion retunerer roles.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getRoles = async function(req, res, next) {
    try {
        const [rows] = await getRoles();
        res.render('admin/roles', { 'title': 'Roller', 'content': 'en liste over roller', 'roles': rows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente roller");
    }
}

/**
 * Denne funktion retunerer edit-role.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showRoleForm = async function(req, res, next) {
    try {
        const [rows] = await showRoleEditForm(req.params.id);
        res.render('admin/edit-role', { 'title': 'Redigér', 'content': 'Redigér rollen', 'role': rows[0] });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde rollen");
    }
}

/**
 * Denne funktion opdaterer role data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editRole = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            level: req.fields.level       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.level == "") {
        req.session.flash = { 
            levelError:"Level skal udfyldes",
            name: req.fields.name,
            level: req.fields.level       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try { 
        const user = await updateRole({
            id: req.params.id, 
            name: req.fields.name, 
            level: req.fields.level
        });
        res.redirect('/admin/editRole/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere rolle");
    }
}

/**
 * Denne funktion sletter role data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteRole = async function(req, res, next) {
    try {
        await deleteRole(req.params.id);
        res.redirect('/admin/roles');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette rolle");
    }
}