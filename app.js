const express = require("express");
const usersPath = require("./routes/users");
const mongoose = require("mongoose");

// Connection To Database 
mongoose.connect("mongodb://localhost/DoneDB")
    .then(() => console.log("Connected To MongoDB..."))
    .catch((error) => console.log("Connection Failed To MongoDB!", error));

// Uygulamayı başlat
const app = express();

// JSON Middleware'i ekle
app.use(express.json());

// Routes
app.use("/api/users", usersPath);

// 📌 Server başlat
const PORT = process.env.PORT || 5001; // 5000 yerine 5001 kullanılıyor
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
