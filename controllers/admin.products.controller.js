const { 
    deleteProduct, 
    updateProduct, 
    createProduct, 
    countProducts, 
    getProducts,
    getOneProduct 
} = require('../models/products.model');
const { getCategories } = require('../models/categories.model');
const { setPrimaryImage, 
    unsetPrimaryImage, 
    productImageRemove, 
    getImages, 
    setImageToProduct, 
    updateImageToProduct, 
    getImagesFromProduct 
} = require('../models/images.model');
const { refererRedirect } = require('../helpers/redirect.helper.js');
/**
 * @module controller/products
 */

 /**
 * Denne funktion retunerer create-product.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showProductCreateForm = async function(req, res, next) {
    try {
        const [images] = await getImages();
        const [rows, fields] = await getCategories(); 
        const product = {
            productId: undefined
        }
        res.render('admin/create-product', { 'images': images, 'title': 'Opret produkt', 'content': 'Opret produkt i formen', 'categories': rows, 'product': product });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST et product
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createProduct = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber        
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,
            price: req.fields.price,    
            year: req.fields.year,
            itemNumber: req.fields.itemNumber    
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.price == "") {
        req.session.flash = { 
            priceError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.year == "") {
        req.session.flash = { 
            yearError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.itemNumber == "") {
        req.session.flash = { 
            itemNumberError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {  
        console.log(req.fields);
        
        const rows = await createProduct({
            name: req.fields.name, 
            description: req.fields.description, 
            price: req.fields.price, 
            year: req.fields.year, 
            itemNumber: req.fields.itemNumber, 
            category: req.fields.category, 
            designer: 1
        });
        
        if(req.fields.chooseImage != undefined) {
            req.fields.chooseImage.forEach(async element => {
                const [imageRows] = await updateImageToProduct({ 
                    id: element, 
                    product: rows.insertId,
                    standard_img: 1
                });
            });
        }
        res.redirect('/admin/products');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette produkt");
    }
}

/**
 * Denne funktion retunerer products.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getProducts = async function(req, res, next) {
    let values = req.query;
       
    // bestem hvor mange elementer der skal vises pr side
    let limit = Number(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/admin/products');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
    // find ud af hvor mange produkter der er i databasen
    let [result] = await countProducts();
    let total_items = result[0].total_items;

    // beregn hvor mange produkter der skal springes over 
    // for at vise den pågældende side
    let offset = (current_page - 1) * limit;

    // beregn hvor mange sider der er i alt, 
    // baseret på antal elementer og elementer pr side
    let total_pages = Math.ceil(total_items / limit);

    // hvis "offset" er større end totalle antal items, så indlæses den sidste side
    if (offset > total_items) {
        res.redirect(`/admin/products?page=${total_pages}&items=${limit}`);
        return;
    }
    try {
        const [rows, fields] = await getProducts({
            productlimit: limit, 
            productoffset: offset
        });

        res.render('admin/products', { 
            'title': 'Produkter', 
            'content': 'en liste over produkter', 
            'products': rows,
            'total_pages': total_pages,
            'current_page': current_page,
            'itemsPerPage': limit
        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente produkter");
    }
}

/**
 * Denne funktion retunerer edit-product.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showProductForm = async function(req, res, next) {
    try {
        const [productRows] = await getOneProduct(req.params.id);
        const [images] = await getImages();
        const [selected] = await getImagesFromProduct(req.params.id);
        const [categoryRows] = await getCategories();
        res.render('admin/edit-product', { 'images': images, 'title': 'Redigér', 'content': 'Redigér kategorien', 'product': productRows[0], 'categories': categoryRows, 'selected' : selected  });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bruger");
    }
}

/**
 * Denne funktion opdaterer product data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editProduct = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber        
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,
            price: req.fields.price,    
            year: req.fields.year,
            itemNumber: req.fields.itemNumber    
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.price == "") {
        req.session.flash = { 
            priceError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.year == "") {
        req.session.flash = { 
            yearError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.itemNumber == "") {
        req.session.flash = { 
            itemNumberError:"Indhold skal udfyldes",
            name: req.fields.name,
            description: req.fields.description,  
            price: req.fields.price,
            year: req.fields.year,
            itemNumber: req.fields.itemNumber      
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    }  
    try {
        const productUpdate = await updateProduct({
            id: req.params.id, 
            name: req.fields.name, 
            description: req.fields.description, 
            price: req.fields.price, 
            year: req.fields.year, 
            itemNumber: req.fields.itemNumber, 
            category: req.fields.category, 
            designer: 1
        });
        
        if(req.fields.chooseImage != undefined) {
            req.fields.chooseImage.forEach(async element => {
                const [imageRows] = await setImageToProduct({ 
                    id: element, 
                    product: req.params.id 
                });
            });
        }

        res.redirect('/admin/editProduct/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere brugere");
    }
}

/**
 * Denne funktion sletter product data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteProduct = async function(req, res, next) {
    try {
        const [delProduct] = await deleteProduct(req.params.id);
        res.redirect('/admin/products');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette produkt");
    }
}

/**
 * Denne funktion sætter primary image til produktet
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.setPrimaryImage = async function(req, res, next) {
    try { 
        const [unset] = await unsetPrimaryImage(refererRedirect(req.headers.referer).split('/').pop())
        const [set] = await setPrimaryImage(req.fields.primaryImg);
        res.redirect(refererRedirect(req.headers.referer));
    } catch (error) {
        return next(error);
    }
}

/**
 * Denne funktion sletter image til produktet
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.productImageRemove = async function(req, res, next) {
    try { 
        const [remove] = await productImageRemove(req.params.id);
        res.redirect(refererRedirect(req.headers.referer));
    } catch (error) {
        return next(error);
    }
}

