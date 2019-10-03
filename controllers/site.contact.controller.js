const db = require('../config/mysql');
/**
 * @module controller/contact
 */

/**
 * Denne funktion retunerer contact.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showContactForm = function(req, res, next) {
    res.render('client/contact', { 'title': 'Kontakt' });
}

/**
 * Denne funktion poster signup med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.sendContactForm = async function(req, res, next) {  

        if(req.fields.name == "") {
            req.session.flash = { 
                nameError:"Navn skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        } 
        if(req.fields.email == "") {
            req.session.flash = { 
                emailError:"Email skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        } 
        
        if(req.fields.message == "") {
            req.session.flash = { 
                messageError:"Kommentar skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        }


    try {
        const contactSQL = `INSERT INTO contact
        SET name = :name, adress = :adress, phone = :phone, email = :email, message = :message`;
        const user = await db.query(contactSQL, {
            name: req.fields.name,
            adress: req.fields.adress,
            phone: req.fields.phone,
            email: req.fields.email,
            message: req.fields.message,
        });
        req.session.flash = { 
            success:"afsendt"
        };
        res.redirect("/kontakt");
        return;
        // res.render('client/contact', { 'title': 'Kontakt' });
    } catch (error) {
        console.log(error);
        res.send("fejl");
    }
 };

