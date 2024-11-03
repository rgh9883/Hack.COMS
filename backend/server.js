import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import * as utils from './api/utils.js';

dotenv.config();

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    multipleStatements: true
});

app.use(express.json());
app.use(cors())

const PORT = 3000;

//HomePage
app.get("/", (req, res) => {
    res.send("Hello this is the Backend")
    utils.executeSQLFile('tables.sql', db)
})

//Template Get
app.get("/users", (req, res) => {
    const q  = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
})

//Template Post
app.post("/users", (req, res) => {
    const q = "INSERT INTO users (`FirstName`, `LastName`, `Password`) VALUES (?)";
    const values = ["Christopher", "West", "blablabla",];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/createUser", (req, res) => {

});

app.post("/createRequest", (req, res) => {

});

app.put("/login", (req, res) => {
    const { username, password } = req.body;
    const q = "SELECT * FROM users_table WHERE username = ? AND password = ?";

    db.query(q, [username, password], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        if (data.length === 0) return res.status(401).json({ message: "Invalid credentials" });
        return res.status(200).json({ message: "Login successful", user: data[0] });
    });
});

app.get("/getMenteeRequests", (req, res) => {

});

app.put("/updateRequest", (req, res) => {

});

app.delete("/deleteRequest", (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})