const { 
    imageUploadResize, 
    getImages, 
    getImageEditForm, 
    updateImage, 
    deleteImage 
} = require('../models/images.model');
/**
 * @module controller/images
 */

 /**
 * Denne funktion retunerer upload-image.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showUploadForm = function(req, res, next) {
    res.render('admin/upload-image', {title: 'Upload et billede'});
}

 /**
 * Denne funktion poster billede til database + public/images
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.uploadImage = async function(req, res, next) {
    let imagelist = [];
    for (x in req.files.billede) {
            imagelist.push(req.files.billede[x]);
    };

    try {
        const images = await imageUploadResize(imagelist);
        res.redirect('/admin/images');
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

 /**
 * Denne funktion viser liste over billeder via images.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showImages = async function(req, res, next) {
    try {
        const [rows] = await getImages()
        res.render('admin/list-images', { 'images': rows, title: 'Billeder' });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

 /**
 * Denne funktion viser edit via edit-.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editFormImage = async function(req, res, next) {
    try {
        if (req.query.action === 'delete') {
            return next();
        }
        const [rows] = await getImageEditForm(req.params.id);
        res.render('admin/edit-image', { 'image': rows[0], 'title': 'Rediger billede' });
    } catch (error) {
        console.log(error);        
        res.send("Kan ikke opdatere designer");
    }
}

/**
 * Denne funktion opdaterer image via /images/:id
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editImage = async function(req, res, next) {
    if (!/image/.test(req.files.billede.type)) {
        return res.send('Den uploadede fil er ikke et billede');
    }
    try {
        const newFileName = Date.now() + '_' + req.files.billede.name;
        const updated = await updateImage(req.files, {name: newFileName, id:req.params.id}, newFileName)
        res.redirect('/admin/images/' + req.params.id);
    } catch (error) {
        return next(error);
    }
}

/**
 * Denne funktion sletter image via /images/:id
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteImage = async function(req, res, next) {
    try {
        const rows = await deleteImage(req.params.id, req.query);
        res.redirect('/admin/images');
    } catch (error) {
        return next(error);
    }
}