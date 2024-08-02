import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
   
dotenv.config();

const app = express();
const port = process.env.PORT || 8888; // Changed port to 8888
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// display if the db is connected or not 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/loginCheck', (req, res) => {
    const { phone, password, userType } = req.body;
    const validUserTypes = ['Customer', 'Vendor', 'DeliveryAgent', 'Admin']; // Add other valid user types if needed
    if (!validUserTypes.includes(userType)) {
        res.status(400).send('Invalid user type');
        return;
    }

    let query;
    if (userType === 'Customer') {
        query = 'SELECT customer_password FROM Customer WHERE phone_number = ?';
    } else if (userType === 'Vendor') {
        query = 'SELECT vendor_password FROM Vendor WHERE Phone_number = ?';
    } else if (userType === 'DeliveryAgent') {
        // cursor.execute("SELECT da_name FROM DeliveryAgent WHERE da_name = %s AND da_password = %s", (da_name, da_pass))
        query = 'SELECT da_password FROM DeliveryAgent WHERE da_name = ?';
    } else if (userType === 'Admin') {
        query = 'SELECT admin_password FROM Admin WHERE phone_number = ?';
    }

    db.query(query, [password], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('User not found');
            return;
        }

        const user = result[0];
        const storedPassword = user[Object.keys(user)[0]]; // Get the password field dynamically
        if (storedPassword !== password) {
            res.status(401).send('Incorrect password');
            return;
        }
        res.status(200).send('User found');
    });
});


app.post('/SignNewUser',(req,res)=>{
    const {email,password,userType} = req.body;
    const query = 'INSERT INTO ?? (email,password) VALUES (?,?)';  
    db.query(query, [userType, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error');
            return;
        }
        res.status(200).send('User added');
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});