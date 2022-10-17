const express = require('express');
const router = express.Router();
const Book = require("../models/book.model.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// READ
router.get("/books", (req, res, next) => {

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

router.get("/books/:bookId/details", (req, res, next) => {
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


// CREATE  - CRUD
// UPDATE
// DELETE

module.exports = router;
