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

app.post('/SigninCheck', (req, res) => {
    // code for signin 

    
});
app.post('/loginCheck', (req, res) => {
    const { id, password, userType } = req.body;
    const validUserTypes = ['Customer', 'Vendor', 'DeliveryAgent', 'Admin']; // Add other valid user types if needed
    if (!validUserTypes.includes(userType)) {
        res.status(400).send('Invalid user type');
        return;
    }

    let query;
    if (userType === 'Customer') {
        query = 'SELECT customer_id FROM Customer WHERE phone_number = ? AND customer_password = ?';
    } else if (userType === 'Vendor') {
        query = 'SELECT VendorID FROM Vendor WHERE Phone_number = ? AND vendor_password = ?';
    } else if (userType === 'DeliveryAgent') {
        // cursor.execute("SELECT da_name FROM DeliveryAgent WHERE da_name = %s AND da_password = %s", (da_name, da_pass))
        query = 'SELECT daID FROM DeliveryAgent WHERE da_name = ? AND da_password = ?';
    } else if (userType === 'Admin') {
        // cursor.execute("SELECT hashed_password FROM MAIN_ADMIN WHERE adminID = %s", (admin_id,))
        query = 'SELECT adminID FROM MAIN_ADMIN WHERE adminID = ? AND hashed_password = ?';
    }
    console.log('Executing query:', query);
    console.log('With parameters:', [id, password]);
    // id = id.trim();
    // password = password.trim();
    db.query(query, [id,password], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error');
            return;
        }
        console.log('Query result:', result);
        if (result.length === 0) {
            res.status(401).send('User not found');
            return;
        }
        const customerID = result[0].customer_id;
        console.log('Customer ID:', customerID);
        res.json({
            customer_id: customerID,
            userType: req.body.userType
        });
    });
});

app.post('/getAllBooks', (req, res) => {
    const query = 'SELECT * FROM Book';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('No books found');
            return;
        }
        console.log('Books:', result);
        // book_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        // book_title VARCHAR(255) NOT NULL,
        // book_author VARCHAR(255) NOT NULL,
        // book_genre VARCHAR(255) NOT NULL,
        // book_series VARCHAR(255) NOT NULL,
        // book_publication VARCHAR(255) NOT NULL,
        // book_availability INT NOT NULL,
        // VendorID INT,
        // book_price INT NOT NULL,
        // CONSTRAINT chk_product_price_positive CHECK (book_price >= 0), -- Ensure non-negative product price
        // FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID)
        res.json(result.map(book => ({
            book_id: book.book_id,
            book_title: book.book_title,
            book_author: book.book_author,
            book_genre: book.book_genre,
            book_series: book.book_series,
            book_publication: book.book_publication,
            book_availability: book.book_availability,
            VendorID: book.VendorID,
            book_price: book.book_price
        })));
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