async function fetchSayaMalzemeleri() {
    try {
        const response = await fetch("http://localhost:3000/api/saya-malzemeleri");
        const products = await response.json();

        const productList = document.getElementById("product-list");

        if (products.length === 0) {
            productList.innerHTML = '<p>Ürün bulunamadı.</p>';
            return;
        }

        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML =  `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} TL</p>
                    <p class="product-rating">${"⭐".repeat(product.rating)}</p>
                    <p class="rating">
</p>

                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            </div>
        `;
            console.log(products);  // Konsolda ürünleri kontrol et

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
    }
}



document.addEventListener("DOMContentLoaded", fetchSayaMalzemeleri);
