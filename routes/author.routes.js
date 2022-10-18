const express = require("express");
const Author = require("../models/Author.model.js");
const router = express.Router();

// aqui iran nuestras rutas de autores

// CREAR

// GET "/authors/create" => Ruta para renderizar un form de crear autores
router.get("/create", (req, res, next) => {
  res.render("authors/create.hbs")
})

// router.post("/create", (req, res, next) => {
    
    //     Author.create(req.body)
    //     .then(() => {
        //         res.redirect("/")
        //     })
        //     .catch((err) => {
            //         next(err)
            //     })
            
            // })
            
// POST "/authors/create" => recibir data del form y creara otro autor
router.post("/create", async (req, res, next) => {
  try {
    //const {name, country, yearBorn} = req.body
    await Author.create(req.body)
    res.redirect("/authors");
  } catch (error) {
    next(error);
  }
});

// READ

router.get("/", async (req, res, next) => {

    try {
        const authorList = await Author.find()
        res.render("authors/list.hbs", {authorList})
        

    }catch (error) {
        next (error)
    }

})

module.exports = router;
