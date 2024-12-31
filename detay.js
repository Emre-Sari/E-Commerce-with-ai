// Taban malzemeleri listesi için kod
async function fetchTabanMalzemeleri() {
    try {
        const response = await fetch("http://localhost:3000/api/taban-malzemeleri");
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
                    <p class="product-rating">${"⭐".repeat(product.rating)}</p>
                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            </div>
            `;

            // Ürün kartına tıklanabilirlik ekleme
            productCard.addEventListener("click", () => {
                // Ürün kimliği detay sayfasına parametre olarak gönderilir
                window.location.href = `/taban-malzemeleri-detay.html?id=${product.id}`;
            });
            // "Sepete Ekle" butonuna özel tıklama işlevi
            const addToCartButton = productCard.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", (event) => {
                // Tıklama olayının üst seviyeye yayılmasını engeller
                event.stopPropagation();

                // Sepete ürün ekleme işlemi
                addToCart(product.id);

            });

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde fetch fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded", fetchTabanMalzemeleri);
