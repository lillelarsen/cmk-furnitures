const db = require('../config/mysql');
/**
 * @module Model/users
 */

  /**
 * Denne funktion henter data fra DB-tabellen users
 */
exports.getUsers = async function() {
    try {
        const userSql = `SELECT users.id, username, password, fk_profile, profiles.email, roles.name FROM users 
                        INNER JOIN profiles ON users.fk_profile = profiles.id
                        INNER JOIN roles ON users.fk_role = roles.id`;
        return await db.query(userSql);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion henter data fra DB-tabellen users
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.showUserEditForm = async function(id) {
    try {
        const userSQL = `SELECT users.id, username, password, users.fk_role, fk_profile, profiles.email, roles.id AS roleid FROM users 
                        INNER JOIN profiles ON users.fk_profile = profiles.id
                        INNER JOIN roles ON users.fk_role = roles.id
                        WHERE users.id = :id`;
        return await db.query(userSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen users
 * @param {Object} insertsObject - Placeholder object for kolonnerne username, role
 */
exports.updateUser = async function(insertsObject) {
    try {
        const userSQL = `UPDATE users SET username = :username, fk_role = :role WHERE id = :id`;
        return await db.query(userSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen users
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteUser = async function(id) {
    try {
        const userSQL = `DELETE FROM users WHERE id = :id`;
        return await db.query(userSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};