const db = require('../config/mysql');
/**
 * @module Model/profiles
 */

  /**
 * Denne funktion opdaterer data i DB-tabellen users
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.updateProfile = async function(insertsObject) {
    try {
        const profileSQL = `UPDATE profiles SET email = :email WHERE id = (
            SELECT fk_profile FROM users WHERE id = :id)`;
        return await db.query(profileSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteProfile = async function(id) {
    try {
        const profileSQL = `DELETE profiles WHERE id = (
            SELECT fk_profile FROM users WHERE id = :id)`;
        return await db.query(profileSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};