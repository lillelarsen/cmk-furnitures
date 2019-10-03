const { 
    countContact, 
    getContactById, 
    deleteContact 
} = require('../models/contact.model');
/**
 * @module controller/contact
 */

/**
 * Denne funktion retunerer messages.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getMessages = async function(req, res, next) {
    let values = req.query;
       
    // bestem hvor mange elementer der skal vises pr side
    let limit = Number(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    console.log(limit);
    
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/admin/messages');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
    // find ud af hvor mange produkter der er i databasen
    let [result] = await countContact();
    let total_items = result[0].total_items;

    // beregn hvor mange produkter der skal springes over 
    // for at vise den pågældende side
    let offset = (current_page - 1) * limit;

    // beregn hvor mange sider der er i alt, 
    // baseret på antal elementer og elementer pr side
    let total_pages = Math.ceil(total_items / limit);

    // hvis "offset" er større end totalle antal items, så indlæses den sidste side
    if (offset > total_items) {
        res.redirect(`/admin/messages?page=${total_pages}&items=${limit}`);
        return;
    }

    try {
        const [rows, fields] = await getContact({
            productlimit: limit, 
            productoffset: offset
        });        
        res.render('admin/messages', { 
            'title': 'Kommentarer', 
            'content': 'en liste over Kommentarer', 
            'messages': rows,
            'total_pages': total_pages,
            'current_page': current_page,
            'itemsPerPage': limit
        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente produkter");
    }
}

 /**
 * Denne funktion viser message data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showMessage = async function(req, res, next) {
    try {
        const [rows] = await getContactById(req.params.id);
        res.render('admin/read-message', { 'message': rows[0] });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde besked");
    }
}

 /**
 * Denne funktion sletter message data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteMessage = async function(req, res, next) {
    try {
        await deleteContact(req.params.id);
        res.redirect('/admin/messages');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette produkt");
    }
}