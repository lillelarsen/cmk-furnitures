const db = require('../config/mysql');
/**
 * @module Model/contact
 */

  /**
 * Denne funktion henter/tæller data fra DB-tabellen contact
 */
exports.countContact = async function() {
    try {
        const sql = `SELECT COUNT(*) AS total_items FROM contact`;
        return await db.query(sql);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion henter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getContact = async function(insertsObject) {
    try {
        const sql = `SELECT contact.id, contact.name, contact.adress, contact.phone, contact.email, contact.message
                        FROM contact 
                        ORDER BY contact.name
                        LIMIT :productlimit OFFSET :productoffset`;
        return await db.query(sql, {insertsObject});
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion opdaterer data i DB-tabellen categories
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.getContactById = async function(id) {
    try {
        const messageSQL = `SELECT contact.id, contact.name, contact.adress, contact.phone, contact.email, contact.message
                        FROM contact
                        WHERE contact.id = :id`;
        return await db.query(messageSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteContact = async function(id) {
    try {
        const sql = `DELETE FROM contact WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};