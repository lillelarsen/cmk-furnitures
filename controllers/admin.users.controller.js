const { getUsers, updateUser, deleteUser, showUserEditForm } = require('../models/users.model');
const { getRoles } = require('../models/roles.model');
const { updateProfile, deleteProfile } = require('../models/profiles.model');
/**
 * @module controller/users
 */

/**
 * Denne funktion retunerer users.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getUsers = async function(req, res, next) {
    try {
        const [rows, fields] = await getUsers();        
        res.render('admin/users', { 'title': 'Brugere', 'content': 'en liste over brugere', 'users': rows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente brugere");
    }
}

/**
 * Denne funktion retunerer edit-user.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showUserForm = async function(req, res, next) {
    try {
        const [rows] = await showUserEditForm(req.params.id);
        const [roleRows] = await getRoles();
        res.render('admin/edit-user', { 'title': 'Redigér', 'content': 'Redigér brugeren', 'user': rows[0], isLoggedIn: req.app.locals.isLoggedIn, level: req.app.locals.level, 'roles': roleRows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bruger");
    }
}

/**
 * Denne funktion opdaterer user data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editUser = async function(req, res, next) {
    if(req.fields.email == "") {
        req.session.flash = { 
            emailError:"Email skal udfyldes",
            email: req.fields.email,
            username: req.fields.username       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.username == "") {
        req.session.flash = { 
            usernameError:"Brugernavn skal udfyldes",
            email: req.fields.email,
            username: req.fields.username       
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const user = await updateUser({
            id: req.params.id, 
            username: req.fields.username, 
            role: req.fields.role
        });
        const profile = await updateProfile({
            id: req.params.id, 
            email: req.fields.email
        });
        const path = req.route.path.replace(":id", "");
        res.redirect(path + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere brugere");
    }
}

/**
 * Denne funktion sletter user data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteUser = async function(req, res, next) {
    try {
        await deleteUser(req.params.id);
        await deleteProfile(req.params.id);
        res.redirect('/admin/users/');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette brugere");
    }
}