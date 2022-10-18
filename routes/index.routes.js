const express = require('express');
const router = express.Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// rutas de libros (Cualquier ruta accede a:)
const bookRoutes = require("./book.routes.js")
router.use("/books", bookRoutes)

const authorRoutes = require("./author.routes.js")
router.use("/authors", authorRoutes)

module.exports = router;
