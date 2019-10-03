const db = require('../config/mysql');

module.exports = function(app) {
    app.use(function(req, res, next) {
        if(typeof req.app.locals.isLoggedIn === "undefined") {
            req.app.locals.isLoggedIn = false;
        }
        req.app.locals.user = req.session.user;
        
        next();
    });

    app.use(function(req, res, next) {
        db.query(`SELECT * FROM globals`, (err, site) => {
			if (err) return next(`${err} at db.query (${__filename}:4:5)`);
			req.app.locals.site = site[0];
            next()
		});	
    })
    
    app.use(function(req, res, next) {
        db.query(`SELECT products.id, products.name, price, year, designers.name AS designer, categories.name AS category,
                (SELECT images.name FROM images WHERE products.id = images.fk_product LIMIT 1) AS image
                FROM products 
                INNER JOIN categories ON products.fk_category = categories.id
                INNER JOIN designers ON products.fk_designer = designers.id
                ORDER BY RAND() LIMIT 1`, (err, randomProduct) => {
            if (err) return next(`${err} at db.query (${__filename}:4:5)`);
			req.app.locals.randomProduct = randomProduct[0];
            next()
		});	
    })

}
