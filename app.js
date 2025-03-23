const express = require("express");

// Init app
const app = express();

// Middleware to parse JSON
app.use(express.json()); 

let books = [
  {
    id:1,
    title: "Black Swan",
    author: "Nassim Taleb",
    description: "About Black Swan",
    price: 10,
    cover: "Soft cover",
  },
  {
    id:2,
    title: "Black Swan 2",
    author: "Nassim Taleb 2",
    description: "About Black Swan 2",
    price: 102,
    cover: "Soft cover 2",
  },
];

// 📌 GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// 📌 GET a single book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // Conver ID To Number
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// 📌 POST a new book
app.post("/api/books", (req, res) => {

  console.log(req.body);

  const book = {
    id : books.length+1,
    title : req.body.title,
    author : req.body.author,
    description : req.body.description,
    price : req.body.price,
    cover : req.body.cover,
  };
  books.push(book);
  res.status(201).json(book); // 201 Created
});

// Run the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
