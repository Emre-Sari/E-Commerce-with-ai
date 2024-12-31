const express = require("express");
const mysql = require("mysql2");
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json()); // JSON verilerini parse eder
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
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


app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tüm alanları doldurun." });
    }
  
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Bu kullanıcı adı zaten kullanılıyor." });
        }
        return res.status(500).json({ message: "Sunucu hatası." });
      }
      res.status(201).json({ message: "Kayıt başarılı! Giriş yapabilirsiniz." });
    });
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }
  
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Sunucu hatası." });
      }
  
      if (results.length > 0) {
        // Kullanıcı doğrulandı
        res.status(200).json({ message: "Giriş başarılı!", username: results[0].username });
      } else {
        res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı." });
      }
    });
  });
  

// Ürün tıklama loglarını kaydetme API'si
app.post('/api/logs', (req, res) => {
    const { product_id, username_ } = req.body;

    if (!product_id || !username_) {
        return res.status(400).json({ error: 'Geçersiz veri' });
    }

    const query = "INSERT INTO logs(user_name,product_id) VALUES (?, ?)";
    const values = [username_, product_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Log kaydederken hata:", err);
            return res.status(500).json({ error: 'Log kaydederken hata oluştu' });
        }
        console.log("Log kaydedildi:", result);
        res.status(200).json({ message: 'Log başarıyla kaydedildi' });
    });
});

app.get('/top-products', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).send('Kullanıcı adı gerekli.');
  }

  const query = `
    SELECT products.id, products.name, products.image_url, 
    products.price, COUNT(logs.product_id) as click_count
    FROM products
    JOIN logs ON logs.product_id = products.id
    WHERE logs.user_name = ?
    GROUP BY logs.product_id, products.id
    ORDER BY COUNT(logs.product_id) DESC
    LIMIT 5
  `;

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası.');
    }

    if (results.length === 0) {
      // Kullanıcıya ait tıklama verisi yoksa rastgele ürünler getir
      const randomQuery = `
        SELECT id, name, image_url, price
        FROM products
        ORDER BY RAND()
        LIMIT 5
      `;

      db.query(randomQuery, (randomErr, randomResults) => {
        if (randomErr) {
          return res.status(500).send('Veritabanı hatası.');
        }

        if (randomResults.length === 0) {
          return res.status(404).send('Ürün bulunamadı.');
        }

        return res.json(randomResults);
      });
    } else {
      res.json(results);
    }
  });
});


app.get('/random-products', (req, res) => {
  const query = `
    SELECT id, name, image_url, price
    FROM products
    ORDER BY RAND()
    LIMIT 5
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası.');
    }

    if (results.length === 0) {
      return res.status(404).send('Ürün bulunamadı.');
    }

    res.json(results);
  });
});











// Sepete ürün ekleme
app.post('/add-to-cart', (req, res) => {
  const { productId } = req.body;

  const query = `
      INSERT INTO cart (product_id, quantity)
      VALUES (?, 1)
      ON DUPLICATE KEY UPDATE quantity = quantity + 1
  `;

  db.query(query, [productId], (err) => {
      if (err) {
          return res.status(500).json({ message: 'Hata oluştu' });
      }
      res.json({ message: 'Ürün sepete eklendi' });
  });
});

// Sepeti listeleme
app.get('/cart', (req, res) => {
  const query = `
      SELECT cart.id AS cart_id, products.id AS product_id, products.name, products.price, products.image_url, cart.quantity
      FROM cart
      JOIN products ON cart.product_id = products.id
  `;

  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Hata oluştu' });
      }
      res.json(results);
  });
});

// Sepetten ürün kaldırma
app.post('/remove-from-cart', (req, res) => {
  const { cartId } = req.body;
  const query = "DELETE FROM cart WHERE product_id = ?";

  db.query(query, [cartId], (err) => {
      if (err) {
          return res.status(500).json({ message: 'Hata oluştu' });
      }
      res.json({ message: 'Ürün sepetten kaldırıldı' });
  });
});

// Sepet miktarını güncelleme
app.post('/update-cart', (req, res) => {
  const { cartId, quantity } = req.body;

  if (quantity <= 0) {
      return res.status(400).json({ message: 'Miktar 0 veya daha az olamaz.' });
  }

  const query = "UPDATE cart SET quantity = ? WHERE product_id = ?";

  db.query(query, [quantity, cartId], (err) => {
      if (err) {
          return res.status(500).json({ message: 'Hata oluştu' });
      }
      res.json({ message: 'Ürün miktarı güncellendi' });
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});

app.get('/cart/count', (req, res) => {
  const query = 'SELECT SUM(quantity) AS total_items FROM cart';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Veritabanı hatası');
    }
    res.json({ total_items: result[0].total_items || 0 });
  });
});
