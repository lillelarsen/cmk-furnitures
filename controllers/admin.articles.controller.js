const { 
    createArticle, 
    deleteArticle, 
    showArticle, 
    showArticleEditForm,
    updateArticle,
    countArticles 
} = require('../models/articles.model');
const { refererRedirect } = require('../helpers/redirect.helper.js');

/**
 * @module controller/articles
 */

 /**
 * Denne funktion retunerer create-article.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showArticleCreateForm = async function(req, res, next) {
    try {
        res.render('admin/create-article', { 'title': 'Opret nyhed', 'content': 'Opret nyhed i formen' });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST en nyhed
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createArticle = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            content: req.fields.content  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.content == "") {
        req.session.flash = { 
            contentError:"Indhold skal udfyldes",
            name: req.fields.name,
            content: req.fields.content  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {       
        const article = await createArticle({
            name: req.fields.name, 
            content: req.fields.content, 
            user: req.session.user
        });
        res.redirect('/admin/articles');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette nyhed");
    }
}

/**
 * Denne funktion retunerer News.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getArticles = async function(req, res, next) {
    let values = req.query;
       
    // bestem hvor mange elementer der skal vises pr side
    let limit = Number(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    console.log(limit);
    
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/admin/articles');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
    // find ud af hvor mange produkter der er i databasen
    let [result] = await countArticles();
    let total_items = result[0].total_items;

    // beregn hvor mange produkter der skal springes over 
    // for at vise den pågældende side
    let offset = (current_page - 1) * limit;

    // beregn hvor mange sider der er i alt, 
    // baseret på antal elementer og elementer pr side
    let total_pages = Math.ceil(total_items / limit);

    // hvis "offset" er større end totalle antal items, så indlæses den sidste side
    if (offset > total_items) {
        res.redirect(`/admin/articles?page=${total_pages}&items=${limit}`);
        return;
    }

    try {
        const [rows, fields] = await showArticle({
            articlelimit: limit, 
            articleoffset: offset
        });        
        res.render('admin/articles', { 
            'title': 'Nyheder', 
            'content': 'en liste over nyheder', 
            'articles': rows,
            'total_pages': total_pages,
            'current_page': current_page,
            'itemsPerPage': limit
        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente nyheder");
    }
}

/**
 * Denne funktion retunerer edit-article.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showArticleForm = async function(req, res, next) {
    try {
        const [userRows] = await showArticleEditForm(req.params.id);
        res.render('admin/edit-article', { 'title': 'Redigér', 'content': 'Redigér nyheden', 'article': userRows[0]  });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde nyhed");
    }
}

/**
 * Denne funktion opdaterer News data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editArticle = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            content: req.fields.content  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.content == "") {
        req.session.flash = { 
            contentError:"Indhold skal udfyldes",
            name: req.fields.name,
            content: req.fields.content  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        
        const news = await updateArticle({
            id: req.params.id, 
            name: req.fields.name, 
            content: req.fields.content , 
            user: req.fields.user
        });
        res.redirect('/admin/editArticle/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere nyhed");
    }
}

/**
 * Denne funktion sletter News data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteArticle = async function(req, res, next) {
    try {
        const [deleted] = await deleteArticle(req.params.id);
        res.redirect('/admin/articles');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette nyhed");
    }
}