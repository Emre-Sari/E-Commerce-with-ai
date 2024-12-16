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
        const response = await fetch("http://localhost:3000/api/taban-malzemeleri");
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

            // Ürün kartına tıklanabilirlik ekleme
            productCard.addEventListener("click", () => {
                window.location.href = `taban-malzemeleri-detay.html?id=${product.id}`; // Detay sayfasına yönlendirme
            });

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde fetch fonksiyonunu çalıştır
document.addEventListener("DOMContentLoaded", fetchTabanMalzemeleri);




// Sepet verisini yerel depolama (localStorage) içinde saklamak
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Sepeti al veya boş dizi oluştur
    cart.push(product);  // Ürünü sepete ekle
    localStorage.setItem("cart", JSON.stringify(cart));  // Sepeti güncelle
    updateCartIcon();  // Sepet ikonunu güncelle
}

// Sepet ikonundaki ürün sayısını güncelleme
function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.getElementById("cart-icon");
    const cartCount = cart.length;
    
    // Sepet ikonu üzerine ürün sayısını ekleyelim
    if (cartCount > 0) {
        cartIcon.innerHTML = `🛒 (${cartCount})`;
    } else {
        cartIcon.innerHTML = '🛒';
    }
}

// Sepet sayfasını gösterme
function showCart() {
    const cartModal = document.getElementById("cart-modal");
    const cartList = document.getElementById("cart-list");
    
    // Sepetteki ürünleri al
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Sepet listesini sıfırla
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Sepetiniz boş.</p>';
    } else {
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.price} TL</p>
                <button onclick="removeFromCart(${index})">Kaldır</button>
            `;
            cartList.appendChild(cartItem);
        });
    }
    
    // Sepet modalını göster
    cartModal.style.display = "block";
}

// Sepetten ürün kaldırma
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);  // Ürünü listeden kaldır
    localStorage.setItem("cart", JSON.stringify(cart));  // Sepeti güncelle
    updateCartIcon();  // Sepet ikonunu güncelle
    showCart();  // Sepet sayfasını yeniden göster
}

// Sepet modalını kapatma
function closeCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "none";
}

// Sayfa yüklendiğinde sepete ekleme butonlarını bağlama
document.addEventListener("DOMContentLoaded", () => {
    // Ürün kartlarındaki "Sepete Ekle" butonlarını dinle
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector(".product-name").textContent,
                price: productCard.querySelector(".product-price").textContent,
                image_url: productCard.querySelector(".product-image").src,
                rating: productCard.querySelector(".product-rating").textContent.length,
            };
            addToCart(product);  // Sepete ürün ekle
        });
    });

    // Sepet linkine tıklanırsa sepeti göster
    const cartLink = document.getElementById("cart-link");
    cartLink.addEventListener("click", showCart);
    
    // Sepet modalını kapatma
    const closeButton = document.getElementById("close-cart");
    closeButton.addEventListener("click", closeCart);
    
    // Sepet ikonunu güncelle
    updateCartIcon();
});
