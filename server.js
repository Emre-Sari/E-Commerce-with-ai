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
// "saya Malzemeleri" ürünlerini çeken API
app.get("/api/saya-malzemeleri", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Saya Malzemeleri'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// "Bagcik Malzemeleri" ürünlerini çeken API
app.get("/api/bagcik-malzemeleri", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Bagcik Malzemeleri'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// "Yapistirici Malzemeleri" ürünlerini çeken API
app.get("/api/yapistirici-malzemeleri", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Yapistirici Malzemeleri'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// "aksesuar Malzemeleri" ürünlerini çeken API
app.get("/api/aksesuar", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Aksesuar'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// "boya Malzemeleri" ürünlerini çeken API
app.get("/api/boya", (req, res) => {
    const query = "SELECT * FROM products WHERE category = 'Boya'";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Tek bir ürün detaylarını çeken API
app.get("/api/taban-malzemeleri/:id", (req, res) => {
    const productId = req.params.id;
    const query = "SELECT * FROM products WHERE id = ?";
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Ürün bulunamadı." });
        }
        res.json(results[0]);
    });
});



// Tüm ürünleri getiren API
app.get("/api/urunler", (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Ürünleri çekerken hata oluştu:", err);
            res.status(500).json({ error: "Ürünler alınamadı." });
            return;
        }
        res.json(results);
    });
});

// Dinamik arama API'si
app.get("/api/arama", (req, res) => {
    const searchTerm = req.query.q ? `%${req.query.q}%` : "%"; // Arama terimi
    const query = `
        SELECT * FROM products 
        WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
    `;
    db.query(query, [searchTerm, searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error("Arama işlemi sırasında hata oluştu:", err);
            res.status(500).json({ error: "Arama sırasında bir hata oluştu." });
            return;
        }
        res.json(results);
    });
});
















app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});

