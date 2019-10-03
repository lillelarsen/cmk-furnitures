# CMK Møbler

## Admin test login
Brugernavn: `test`

Password: `test`

Adminpanel: /login || /admin

## Structure
Index.js i roden, styrer hele projektet. Her skal alle stier **requires**.
```javascript
require('./config/index')(app);
require('./routes/index')(app);
```
I **config**-mappen ligger der JS-filer til forskellige overordnet konfigarationer.

I **routes**-mappen kan der tilføjes flere routes til projektet. Til disse routes kan man nemt referere til controllors, og kører dem i index.js

I **controller**-mappen kan der tilføjes flere controllere til projektet. Disse kan hentes i de nødvendige routes.

I **views**-mappen kan der tilføjes views/ejs-filer til projektet. Disse kan hentes i de nødvendige controllers.

I **middleware**-mappen kan der tilføjes middleware til projektet. Disse kan hentes i de nødvendige routes m.m.

**Out**-mappen genereres automatisk, ved hjælp af `npm run jsdoc`, og dokumenterer de valgte mapper og filer.

Mappen **public** er til dine statiske filer hvor bl.a. media, scripts og stylesheets hører til.

Mappen **server** er konfiguration af express-serveren.

Mappen **sql** ligger den seneste tilhørende database.

## NPM Packages
* **Depended Packages**
* [dotenv](https://www.npmjs.com/package/dotenv)
* [ejs](https://www.npmjs.com/package/ejs)
* [express](https://www.npmjs.com/package/express)
* [express-formidable](https://www.npmjs.com/package/express-formidable)
* [express-session](https://www.npmjs.com/package/express-session)
* [mysql2](https://www.npmjs.com/package/mysql2)
* **Developer packages**
* [nodemon](https://www.npmjs.com/package/nodemon)
 
