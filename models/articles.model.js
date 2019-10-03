const db = require('../config/mysql');
/**
 * @module Model/articles
 */

  /**
 * Denne funktion viser data fra DB-tabellen articles
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.showArticleEditForm = async function(id) {
    try {
        const articleSQL = `SELECT articles.id, articles.name, articles.content, articles.fk_user, articles.created_at FROM articles 
                        WHERE articles.id = :id`;
        return await db.query(articleSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen articles
 * @param {Object} insertsObject - Placeholder for kolonnerne name, content, user
 */
exports.updateArticle = async function(insertsObject) {
    try {
        const articleSQL = `UPDATE articles SET name = :name, content = :content, fk_user = :user WHERE id = :id`;
        return await db.query(articleSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

 /**
 * Denne funktion indsætter data i DB-tabellen articles
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, content, user
 */
exports.createArticle = async function(insertsObject) {
    try {
        const articleSQL = `INSERT INTO articles SET name = :name, content = :content, fk_user = :user`;
        return await db.query(articleSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

 /**
 * Denne funktion sletter data fra DB-tabellen articles
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteArticle = async function(id) {
    try {
        const articleSQL = `DELETE FROM articles WHERE id = :id`;
        return await db.query(articleSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

 /**
 * Denne funktion henter/tælller data fra DB-tabellen articles 
 */
exports.countArticles = async function() {
    try {
        const articleSQL = `SELECT COUNT(*) AS total_items FROM articles`;
        return await db.query(articleSQL);
    } catch (error) {
        console.log(error);
        return null;
    }
};


 /**
 * Denne funktion henter data fra DB-tabellen articles
 * @param {Object} insertsObject - Placeholder object for LIMIT og OFFSET
 */
exports.showArticle = async function(insertsObject) {
    try {
        const articleSQL = `SELECT articles.id, articles.name, articles.content, articles.fk_user, articles.created_at
                        FROM articles 
                        ORDER BY articles.name
                        LIMIT :articlelimit OFFSET :articleoffset`;
        return await db.query(articleSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};
