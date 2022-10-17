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


  // CREATE
// GET "/books/create" => ruta para renderizar a form
  router.get("/create", (req, res, next) => {

    res.render("books/create.hbs")
  })

  // GET "/books/create/add" => recibir data de form y crear libro 

  router.get("/create/add", (req, res, next) => {
    
  })

module.exports = router;
//siempre necesitamos estas lineas para crear nuevo archivos de rutas