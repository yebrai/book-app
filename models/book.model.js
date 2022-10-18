const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    // author: {
   
    //     type: mongoose.Schema.Types.ObjectId, // el tipo sera un ID de un documento de cualquier collect
    //     ref: "Author" //a que coleccion pertenece esta relacion
    
    // }
    author: [{
   
        type: mongoose.Schema.Types.ObjectId, // el tipo sera un ID de un documento de cualquier collect
        ref: "Author" //a que coleccion pertenece esta relacion
    
    }]
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book