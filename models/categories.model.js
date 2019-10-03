const db = require('../config/mysql');
/**
 * @module Model/categories
 */

  /**
 * Denne funktion henter data fra DB-tabellen categories
 */
exports.getCategories = async function() {
    try {
        const sql = `SELECT id, name, description FROM categories`;
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
exports.showCategoryEditForm = async function(id) {
    try {
        const sql = `SELECT id, name, description FROM categories WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opretter data i DB-tabellen categories
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.createCategory = async function(insertsObject) {
    try {
        const categorySQL = `INSERT INTO categories SET name = :name, description = :description`;
        return await db.query(categorySQL, insertsObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen categories
 * @param {Object} insertsObject - Placeholder object for kolonnerne name, description
 */
exports.updateCategory = async function(insertsObject) {
    try {
        const categorySQL = `UPDATE categories SET name = :name, description = :description WHERE id = :id`;
        return await db.query(categorySQL, insertsObject);
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
        const sql = `DELETE FROM categories WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};