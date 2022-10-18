const express = require('express');
const Author = require('../models/Author.model.js');
const router = express.Router();
const Book = require("../models/Book.model.js")

// READ (LEER)
// GET "/books" => ruta donde el usuario ve una lista
router.get("/", (req, res, next) => {

    Book.find()
    .select({title: 1})               //.select("title")
    .then((response) => {
      //console.log(response)
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
    //en populate se introduce la propiedad que tiene el id del modelo
    .populate("author") //busca en la coleccion correspondiente esta propiedad
    .then((response) => {
      //console.log(response)
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
  router.get("/create", async (req, res, next) => {

    try {
      //antes de renderizar voy a buscar todos los autores de la bBD
      const authorList = await Author.find()
      res.render("books/create.hbs", {
        authorList
      })
    }
    catch (error) {
      next(error)
    }


  })

  // POST "/books/create" => recibir data de form y crear libro 
  // el enlace es el mismo ya que al ser POST y no GET son distintas acciones
  router.post("/create", (req, res, next) => {
     // console.log(req.body) // aqui vendra todos los datos del form
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
        
        //2 acer algo con el usuario
        res.redirect("/books")
        // no confundir con render
        //render apunta a un .hbs
        // redirect apunta a una ruta (El usuario hiciera click)
    })
    .catch((err) => {
        next(err)
    })

    
})

//  UPDATE

// GET "/books/:bookId/edit" => renderizar un formuñario incluyendo la data catual del libro

router.get("/:bookId/edit", (req, res, next) => {

    const {bookId} = req.params
    console.log("esto es req.params:", req.params.bookId)
    console.log("esto es desconstruc:", bookId)
    // buscar los detalles del libro para pasarle a la vista

    Book.findById(bookId)
    .then((response) => {
        //console.log(response)

        res.render("books/edit-form.hbs", {
            details: response
        })
    })
    .catch((error) => {
          next(error)
     })
      
 })



// POST "books/edit" => recibir valo para actualizar el libro

router.post("/:bookId/edit", (req, res, next) => {
    
    const { bookId } = req.params
     const {title, description, author} = req.body
     const bookUpdate ={
         title,
         description,
         author
     }
    console.log("esto es req.body: ", req.body)
    console.log("esto es el objeto creado: ", bookUpdate)
    Book.findByIdAndUpdate(bookId, req.body)
    .then(() => {

       res.redirect("/books")

    })
    .catch((err) => {
        next(err)
    })
})


// DELETE (BORRAR)
// POST "/books/:bookId/delete"

router.post("/:bookId/delete",(req, res, next) => {

    // 1 buscar el libro por su id y borrarlo
    Book.findByIdAndDelete(req.params.bookId)
    .then(() => {
            // 2 redireccionar a "/books"
        res.redirect("/books")
    })
    .catch((err) =>  {
        next(err)
    })

    
})

module.exports = router;
//siempre necesitamos estas lineas para crear nuevo archivos de rutas