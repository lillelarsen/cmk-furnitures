const db = require('../config/mysql');
const { compareSync } = require('bcryptjs');
/**
 * @module controller/login
 */

/**
 * Denne funktion retunerer signup.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */

exports.getLoginForm = function(req, res, next) {
    res.render('client/login', { 'title': 'Log ind', 'content': 'Log ind via formularen' });
}

/**
 * Denne funktion håndterer login
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.loginCheck = async function(req, res, next) {
    try {
        const userSQL = `SELECT id, password FROM users WHERE username = :username`;
        const [rows] = await db.query(userSQL, { username: req.fields.username });
        if(rows.length !== 1) {
            res.redirect('/login');
            return;
        }
        if (!compareSync(req.fields.password, rows[0].password)) {
            res.redirect('/login');
            return;
        }
        req.session.isLoggedIn = true;
        req.session.user = rows[0].id;
        req.app.locals.isLoggedIn = true;
        res.redirect(`/profile/${req.session.user}`);
    } catch (error) {
        console.log(error);
        res.send("fejl");
    }
 };


 /**
 * Denne funktion håndterer logout
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
 exports.logout = function(req, res, next) {
     delete req.session.isLoggedIn;
     delete req.session.user;
     delete req.app.locals.isLoggedIn;
     res.redirect('/login');
 }