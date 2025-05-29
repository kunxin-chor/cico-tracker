const express = require("express");
const mysql2 = require("mysql2/promise");
const ejs = require("ejs");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index");
});

app.get('/food-entry/add', async (req, res) => {
    res.render("add-food-entry");
})

app.post('/food-entry/add', async (req, res) => {
    const { dateTime, foodName, calories, meal, tags, servingSize, unit } = req.body;
    console.log(dateTime, foodName, calories, meal, tags, servingSize, unit);
    res.send("Food entry added successfully");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});