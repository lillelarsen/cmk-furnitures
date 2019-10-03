const db = require('../config/mysql');
/**
 * @module Model/designers
 */

  /**
 * Denne funktion henter data fra DB-tabellen designers
 */
exports.getDesigners = async function() {
    try {
        const designersSQL = `SELECT id, name FROM designers`;
        return await db.query(designersSQL);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion henter data fra DB-tabellen designers
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getDesignerEditForm = async function(id) {
    try {
        const designerSQL = `SELECT id, name FROM designers WHERE id = :id`;
        return await db.query(designerSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opretter data i DB-tabellen designers
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.createDesigner = async function(insertsObject) {
    try {
        const designerSQL = `INSERT INTO designers SET name = :name`;
        return await db.query(designerSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen designers
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.updateDesigners = async function(insertsObject) {
    try {
        const designerSQL = `UPDATE designers SET name = :name WHERE id = :id`;
        return await db.query(designerSQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteCategory = async function(id) {
    try {
        const sql = `DELETE FROM designers WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};