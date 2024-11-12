const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


// MySQL bağlantısı
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2002Emre.",  // kendi MySQL şifrenizi girin
    database: "shopDB"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL bağlantısı başarılı!");
});

// "Taban Malzemeleri" ürünlerini çeken API
app.get("/api/taban-malzemeleri", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Taban Malzemeleri'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
