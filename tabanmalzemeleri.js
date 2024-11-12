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
                <img src="${product.image_url}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Fiyat: ${product.price} TL</p>
                <p>Rating: ${"⭐".repeat(product.rating)}</p>
                <button class="add-to-cart">Sepete Ekle</button>
            `;
            console.log(products);  // Konsolda ürünleri kontrol et

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchTabanMalzemeleri);
