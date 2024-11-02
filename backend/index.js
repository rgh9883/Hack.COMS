import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "KavanHegde11",
    database:"test"
});

app.use(express.json());
app.use(cors())


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello this is the Backend")
})

app.get("/users", (req, res) => {
    const q  = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
})

app.post("/users", (req, res) => {
    const q = "INSERT INTO users (`FirstName`, `LastName`, `Password`) VALUES (?)";
    const values = ["Christopher", "West", "blablabla",];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})