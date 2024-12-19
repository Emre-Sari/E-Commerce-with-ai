document.getElementById("menu-toggle").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
});

// Sidebar'ı kapatmak için "X" butonuna tıklama işlevi
document.getElementById("close-sidebar").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("open");
});    

// fetchTabanMalzemeleri fonksiyonu
async function fetchTabanMalzemeleri() {
    try {
        const response = await fetch("http://localhost:3000/api/aksesuar");
        if (!response.ok) {
            throw new Error("Ürünler getirilemedi");
        }

        const products = await response.json();
        const productList = document.getElementById("product-list");

        if (products.length === 0) {
            productList.innerHTML = '<p>Ürün bulunamadı.</p>';
            return;
        }

        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} TL</p>
                    <p class="product-rating">${"⭐".repeat(product.rating || 0)}</p>
                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            </div>
            `;

            // Ürün kartına tıklanabilirlik ekleme ve ID'yi ekrana yazdırma
            productCard.addEventListener("click", async () => {
                // ID'yi ekranda göstermek için alert
                alert(`Tıklanan ürünün ID'si: ${product.id}`);
                console.log(`Tıklanan ürünün ID'si: ${product.id}`);

                // Ürün ID'sini veritabanına kaydetmek için API'ye gönder
                await logProductClick(product.id);

                // Ürün sayfasına yönlendirme
                window.location.href = `taban-malzemeleri-detay.html?id=${product.id}`;
            });

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
    }
}

// API'ye ürün ID'sini gönder
async function logProductClick(productId) {
    try {
        const response = await fetch("http://localhost:3000/api/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_id: productId,
                username_: localStorage.getItem("username") // Şu anki zamanı kaydediyoruz
            })
        });

        if (!response.ok) {
            throw new Error("Log kaydı yapılamadı");
        }

        console.log("Log kaydı başarılı");
    } catch (error) {
        console.error("Log kaydı hatası:", error);
    }
}

// Sayfa yüklendiğinde fetch fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded", fetchTabanMalzemeleri);
