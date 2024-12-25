
                const searchInput = document.getElementById("search-bar");
                const resultsContainer = document.getElementById("search-results");
                let products = []; // Ürünleri API'den çekeceğiz
            
                // API'den ürünleri çek
                async function fetchProducts() {
                    try {
                        const response = await fetch("http://localhost:3000/api/urunler");
                        if (!response.ok) throw new Error("Ürünleri çekme sırasında bir hata oluştu.");
                        products = await response.json(); // Ürünleri al ve global değişkene ata
                    } catch (error) {
                        console.error("API bağlantı hatası:", error);
                    }
                }
            
                // Arama çubuğunda input etkinliği dinle
                searchInput.addEventListener("input", (e) => {
                    const query = e.target.value.toLowerCase(); // Kullanıcı girdisini al
                    resultsContainer.innerHTML = ""; // Eski sonuçları temizle
                    resultsContainer.style.display = query ? "block" : "none"; // Arama çubuğu boşsa gizle
            
                    // Ürünleri filtrele ve sonuçları listele
                    const filteredProducts = products.filter(product =>
                        product.name.toLowerCase().includes(query)
                    );
            
                    if (filteredProducts.length === 0) {
                        resultsContainer.innerHTML = "<p style='padding: 10px;'>Sonuç bulunamadı.</p>";
                        return;
                    }
            
                    filteredProducts.forEach(product => {
                        const productElement = document.createElement("div");
                        productElement.style.padding = "10px";
                        productElement.style.borderBottom = "1px solid #ddd";
                        productElement.innerHTML = `
                            <a href="taban-malzemeleri-detay.html?id=${product.id} style="text-decoration: none; color: #333;">
                                <strong>${product.name}</strong> - ₺${product.price}
                            </a>
                        `;
                        resultsContainer.appendChild(productElement);
                    });
                });
            
                // Sayfa yüklendiğinde ürünleri API'den çek
                document.addEventListener("DOMContentLoaded", fetchProducts);
            