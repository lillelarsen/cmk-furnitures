const { 
    getGlobals, 
    updateGlobals, 
    getHours 
} = require('../models/globals.model');

/**
 * @module controller/admin-main
 */

/**
 * Denne funktion retunerer main.ejs (admin) med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.main = async (req, res, next) => {
    try {
        const [rows] = await getGlobals();
        console.log(rows);
        
        const [hourRows] = await getHours();
        res.render('admin/main', { 'title': 'Administrationspanel', 'content': 'Forside', 'global': rows[0], 'openingHours': hourRows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente globals");
    }
}

/**
 * Denne funktion opdaterer Global data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editGlobals = async function(req, res, next) {
    if(req.fields.sitename == "") {
        req.session.flash = { 
            sitenameError:"Sidens Navn skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.sitedescription == "") {
        req.session.flash = { 
            sitedescriptionError:"Sidens beskrivelse skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.street == "") {
        req.session.flash = { 
            streetError:"Vej skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.streetNumber == "") {
        req.session.flash = { 
            streetNumberError:"Nummer skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.postalCode == "") {
        req.session.flash = { 
            postalCodeError:"Postnummer skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.city == "") {
        req.session.flash = { 
            cityError:"By skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.phone == "") {
        req.session.flash = { 
            phoneError:"Telefon skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.telefax == "") {
        req.session.flash = { 
            telefaxError:"Telefax skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.email == "") {
        req.session.flash = { 
            emailError:"Email skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const globals = await updateGlobals({
            id: 1, 
            name: req.fields.sitename, 
            description: req.fields.sitedescription, 
            street: req.fields.street, 
            street_number: req.fields.streetNumber, 
            postal_code: req.fields.postalCode, 
            city: req.fields.city, 
            phone: req.fields.phone, 
            telefax: req.fields.telefax, 
            email: req.fields.email 
        });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere Globals");
    }
}


