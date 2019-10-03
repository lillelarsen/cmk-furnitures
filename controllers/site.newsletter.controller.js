const db = require('../config/mysql');
/**
 * @module controller/newsletter
 */

/**
 * Denne funktion opretter med POST en subscription til nyhedsbrev
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.subscribeNewsletter = async function(req, res, next) {
    if(req.fields.email == "") {
        req.session.flash = { 
            subscribeError:"Email skal udfyldes"
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const categorySQL = `INSERT INTO newsletter SET email = :email`;
        const category = await db.query(categorySQL, {email: req.fields.email});
        req.session.flash = { 
            success:"Du er nu tilmeldt"
        };
        res.redirect(req.headers.referer);
    } catch (error) {
        if(error.code == "ER_DUP_ENTRY") {
            req.session.flash = { 
                subscribeError:"Email er allerede tilmeldt"
            };
            res.redirect(req.headers.referer);
        }
        console.log(error);
        res.send("Kan ikke oprette kategori");
    }
}

/**
 * Denne funktion sletter en subscription til nyhedsbrev
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.unsubscribeNewsletter = async function(req, res, next) {
    if(req.fields.email == "") {
        req.session.flash = { 
            subscribeError:"Email skal udfyldes"
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const userSQL = `DELETE FROM newsletter WHERE email = :email`;

        await db.query(userSQL, {email: req.fields.email});
        req.session.flash = { 
            success:"Du er nu afmeldt"
        };
        res.redirect(req.headers.referer);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette kategori");
    }
}