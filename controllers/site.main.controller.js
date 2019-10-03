const db = require('../config/mysql');
/**
 * @module controller/home
 */

/**
 * Denne funktion retunerer main.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.main = async (req, res, next) => {
    try {
        const articlesSql = `SELECT articles.id, articles.name, articles.content, articles.created_at, articles.fk_user
                        FROM articles
                        ORDER BY articles.created_at DESC 
                        LIMIT 3 `;
        const [rows, fields] = await db.query(articlesSql);        
        res.render('client/main', { 'title': 'Forside', 'articles': rows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente produkter");
    }
}