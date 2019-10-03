const db = require('../config/mysql');
/**
 * @module controller/articles
 */

/**
 * Denne funktion viser nyheder på news.ejs 
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showArticlesList = async function(req, res, next) {    
    try {        
        let articlesSQL = `SELECT articles.id, articles.name, articles.content, articles.created_at, articles.fk_user
                        FROM articles 
                        ORDER BY articles.created_at DESC`;
        
        const [rows] = await db.query(articlesSQL);
        res.render('client/news', { 
            'title': 'Nyheder', 
            'content': 'en liste over nyheder', 
            'articles': rows
        });

    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde resultater");
    }
    
}

/**
 * Denne funktion viser nyheden på news.ejs 
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showArticle = async function(req, res, next) {
    try {
        const articleSQL = `SELECT articles.id, articles.name, articles.content, articles.fk_user, articles.created_at  
                        FROM articles 
                        WHERE articles.id = :id`;
        const [articleRows] = await db.query(articleSQL, {id: req.params.id});


        res.render('client/single-news', { 'title': articleRows[0].name, 'content': 'Redigér kategorien', 'news': articleRows[0] });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde nyhed");
    }
}