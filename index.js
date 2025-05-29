const express = require("express");
const mysql2 = require("mysql2/promise");
const ejs = require("ejs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const dbConnection = mysql2.createPool(dbConfig);

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/food-entry/add', async (req, res) => {
    res.render("add-food-entry");
})

app.post('/food-entry/add', async (req, res) => {
    const { dateTime, foodName, calories, meal, tags, servingSize, unit } = req.body;
    const query = "INSERT INTO food_entries (dateTime, foodName, calories, meal, tags, servingSize, unit) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [dateTime, foodName, calories, meal, tags, servingSize, unit];
    await dbConnection.execute(query, values);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});