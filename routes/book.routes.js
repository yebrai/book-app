const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Book = require("../models/book.model.js")

// READ (LEER)
// GET "/books" => ruta donde el usuario ve una lista
router.get("/", (req, res, next) => {

    Book.find()
    .select({title: 1})               //.select("title")
    .then((response) => {
      console.log(response)
      res.render("books/list.hbs", {
        bookList: response
      })
    })
    .catch((error) => {
      next(error)
    })
  })

// GET "/books/:boodId/details" => ruta para renderizar los detalles de un libro
  router.get("/:bookId/details", (req, res, next) => {
    const {bookId} = req.params
  
    Book.findById(bookId)
    .then((response) => {
      console.log(response)
      res.render("books/details.hbs", {
        details: response
      })
  
    })
    .catch((err) => {
      next(err)
    })
  })
// req.params, la recibo del GET. Coje el enlace
// req.query, la recibo del GET. Coje el input
// req.body, la recibo del POST (body)

  // CREATE
// GET "/books/create" => ruta para renderizar a form
  router.get("/create", (req, res, next) => {

    res.render("books/create.hbs")
  })

  // POST "/books/create" => recibir data de form y crear libro 
  // el enlace es el mismo ya que al ser POST y no GET son distintas acciones
  router.post("/create", (req, res, next) => {
      console.log(req.body) // aqui vendra todos los datos del form
    // con Destructuring
    //   const {title, description, author} = req.body
    //   let bookToAdd ={

    //   title: title,
    //   description: description,
    //   author: author

    //   }
    let bookToAdd ={
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    }

    //1 usar la data para crear un nuevo libro
    Book.create(bookToAdd)
    .then((response) => {
        console.log("libro añadido correctamente")

        res.redirect("/books")
        // no confundir con render
        //render apunta a un .hbs
        // redirect apunta a una ruta (El usuario hiciera click)
    })
    .catch((err) => {
        next(err)
    })

    //2 acer algo con el usuario
    



  })


module.exports = router;
//siempre necesitamos estas lineas para crear nuevo archivos de rutas