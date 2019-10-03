const db = require('../config/mysql');
/**
 * @module Model/categories
 */

  /**
 * Denne funktion henter data fra DB-tabellen categories
 */
exports.getRoles = async function() {
    try {
        const roleSQL = `SELECT id, name, level FROM roles`;
        return await db.query(roleSQL);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion henter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.showRoleEditForm = async function(id) {
    try {
        const roleSQL = `SELECT id, name, level FROM roles WHERE id = :id`;
        return await db.query(roleSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opretter data i DB-tabellen categories
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.createRole = async function(insertsObject) {
    try {
        const roleSQL = `INSERT INTO roles SET name = :name, level = :level`;
        return await db.query(roleSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen categories
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.updateRole = async function(insertsObject) {
    try {
        const roleSQL = `UPDATE roles SET name = :name, level = :level WHERE id = :id`;
        return await db.query(roleSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteRole = async function(id) {
    try {
        const sql = `DELETE FROM roles WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};