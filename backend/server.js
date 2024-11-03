import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import * as utils from './utils.js';

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
    const q = "INSERT INTO users_table (`username`, `password`, `email`, `role`, `organization`) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.role,
        req.body.organization
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/createRequest", (req, res) => {
    const users_q = "select user_id from users_table where username = ?"
    const users_value = req.body.username
    let user_id
    db.query(users_q, [users_value], (err, data) => {
        if(err) return res.json(err);
        user_id = data[0].user_id;
        const req_q = "INSERT INTO request_table (`user_id`, `request_type`, `request_status`) VALUES (?)"
        const req_value = [
            user_id,
            req.body.request_type,
            req.body.request_status
        ]
        db.query(req_q, [req_value], (err, data) => {
            if(err) return res.json(err);
            return res.json(data);
        })
    });
});

app.put("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = "SELECT * FROM users_table WHERE username = ? AND password = ?";
    db.query(q, [username, password], (err, data) => {
        if (err) return res.status(500).json({error: err.message});
        if (data.length === 0) return res.status(401).json({message: "Invalid credentials"});
        return res.status(200).json({message: "Login successful", user: data[0]});
    });
});

app.get("/user", (req, res) => {
    const username  = req.query.username;
    const userQuery = "SELECT user_id, role FROM users_table WHERE username = ?";

    db.query(userQuery, [username], (err, userData) => {
        if (err) return res.status(500).json({error: err.message});
        if (userData.length === 0) return res,status(404).json({message: "User not Found"});

        const id = userData[0].user_id;
        const role = userData[0].role;
        
        let q;
        let param;

        if(role === "mentor" || role === "both") {
            q = "SELECT * FROM request_table";
            param = [];
        } else if(role === "mentee") {
            q = "SELECT * FROM request_table WHERE user_id = ?";
            param = [id];
        } else {
            return res.status(401).json({message: "Invalid role"})
        }

        db.query(q, [param], (err, data) => {
            if (err) return res.status(500).json({error: err.message});
            return res.status(200).json({message: "Get successful", requests: data});
        })
    });

});

app.put("/updateRequest", (req, res) => {
    const req_q = "update request_table set request_status = ? where request_id = ?"
    db.query(req_q, [req.body.request_status,
        req.body.request_id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.delete("/deleteRequest", (req, res) => {
    const requestId = req.query.requestId;
    const q = "DELETE FROM request_table WHERE request_id = ?";

    db.query(q, [requestId], (err, data) => {
        if (err) return res.status(500).json({error: err.message});
        return res.status(200).json({message: "Delete successful", requests: data});
    })

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})