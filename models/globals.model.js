const db = require('../config/mysql');
/**
 * @module Model/globals
 */

/**
 * Denne funktion viser data fra DB-tabellen globals
 */
exports.getGlobals = async function() {
    try {
        const globalSQL = `SELECT id, sitename, sitedescription, street, street_number, postal_code, city, phone, telefax, email FROM globals`;
        return await db.query(globalSQL, {});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen globals
 */
exports.getHours = async function() {
    try {
        const hoursSQL = `SELECT id, weekday, opens, closing, closed FROM opening_hours`;
        return await db.query(hoursSQL, {});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen globals
 */
exports.updateGlobals = async function(insertObject) {
    try {
        const globalSQL = `UPDATE globals SET sitename = :name, sitedescription = :description, street = :street, street_number = :street_number, postal_code = :postal_code,
        city = :city, phone = :phone, telefax = :telefax, email= :email   
        WHERE id = :id`;
        return await db.query(globalSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
}

