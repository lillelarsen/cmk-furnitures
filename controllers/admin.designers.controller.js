const { 
    createDesigner, 
    getDesigners, 
    getDesignerEditForm, 
    updateDesigners,
    deleteCategory 
} = require('../models/designers.model');
const { refererRedirect } = require('../helpers/redirect.helper.js');
/**
 * @module controller/designers
 */

 /**
 * Denne funktion retunerer create-designer.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showDesignerCreateForm = async function(req, res, next) {
    try {
        res.render('admin/create-designer', { 'title': 'Opret designer', 'content': 'Opret designer i formen'});
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST en Designer
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createDesigner = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,    
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        const designer = await createDesigner({name: req.fields.name});
        res.redirect('/admin/designers');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette designer");
    }
}

/**
 * Denne funktion retunerer Designers.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getDesigners = async function(req, res, next) {
    try {
        const [rows] = await getDesigners();
        res.render('admin/designers', { 'title': 'designers', 'content': 'en liste over designers', 'designers': rows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente designers");
    }
}

/**
 * Denne funktion retunerer edit-Designer.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showDesignerForm = async function(req, res, next) {
    try {
        const [rows] = await getDesignerEditForm(req.params.id);
        res.render('admin/edit-designer', { 'title': 'Redigér', 'content': 'Redigér designeren', 'designer': rows[0] });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde designeren");
    }
}

/**
 * Denne funktion opdaterer Designer data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editDesigner = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,    
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        const designer = await updateDesigners({id: req.params.id, name: req.fields.name});
        res.redirect('/admin/editDesigner/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere designer");
    }
}

/**
 * Denne funktion sletter Designer data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteDesigner = async function(req, res, next) {
    try {
        await deleteCategory(req.params.id);
        res.redirect('/admin/designers');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette designer");
    }
}