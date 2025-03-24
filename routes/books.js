const express = require("express");
const router = express.Router();

const Joi = require("joi"); 



let books = [
  {
    id: 1,
    title: "Black Swan",
    author: "Nassim Taleb",
    description: "About Black Swan",
    price: 10,
    cover: "Soft cover",
  },
  {
    id: 2,
    title: "Black Swan 2",
    author: "Nassim Taleb 2",
    description: "About Black Swan 2",
    price: 102,
    cover: "Soft cover 2",
  },
];

/**
 * @desc Get All Books
 * @route /api/books
 * @method Get 
 * @access public 
 */
router.get("/", (req, res) => {
  res.json(books);
});

/**
 * @desc Get Book By Id 
 * @route /api/book/id
 * @method Get 
 * @access public 
 */

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // ID'yi numaraya çevir
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc Create New Book
 * @route /api/books
 * @method POST 
 * @access public 
 */
router.post("/", (req, res) => {
  console.log("Request Body:", req.body); // Gelen JSON'u terminale yazdır

  const {error} = validateCreateBook(req.body);

  if (error) {
    console.error("Validation Error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book); // 201 Created
});


/**
 * @desc Update a Book
 * @route /api/books/:id
 * @method PUT 
 * @access public 
 */

  router.put("/:id",(req,res) => {
    const {error} = validateUpdateBook(req.body);

    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
      res.status(200).json({massage :" book has been updated "});
    }else{
      res.status(404).json({massage : "book not found "});
    }
  })

/**
 * @desc Delete a Book
 * @route /api/books/:id
 * @method DELETE
 * @access public 
 */

router.delete("/:id",(req,res) => {

  const book = books.find(b => b.id === parseInt(req.params.id));
  if(book){
    res.status(200).json({massage :" book has been Deleted "});
  }else{
    res.status(404).json({massage : "book not found "});
  }
})









// validate Create book
function validateCreateBook(obj){
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  return schema.validate(obj);
}


// validate Update book
function validateUpdateBook(obj){
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  });

  return schema.validate(obj);
}

module.exports = router; 